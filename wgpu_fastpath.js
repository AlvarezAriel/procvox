function installWgpuFastPath(webgpu, iface) {
const mem = webgpu.mem;
if (mem.intSize !== 4) {
console.warn("[wgpu_fastpath] intSize != 4, leaving stock binding in place");
return;
}
const origBeginCompute = iface.wgpuCommandEncoderBeginComputePass;
const origBeginRender = iface.wgpuCommandEncoderBeginRenderPass;
iface.wgpuCommandEncoderBeginComputePass = (commandEncoderIdx, descriptorPtr) => {
if (descriptorPtr !== 0) {
const nextInChain = mem.loadPtr(descriptorPtr + 0);
const labelLen = mem.loadUint(descriptorPtr + 8);
const tsPtr = mem.loadPtr(descriptorPtr + 12);
if (nextInChain !== 0 || labelLen !== 0 || tsPtr !== 0) {
return origBeginCompute(commandEncoderIdx, descriptorPtr);
}
}
const encoder = webgpu.commandEncoders.get(commandEncoderIdx);
return webgpu.computePassEncoders.create(encoder.beginComputePass(undefined));
};
const clearValue = { r: 0, g: 0, b: 0, a: 1 };
const colorAttachment = {
view: undefined,
resolveTarget: undefined,
depthSlice: undefined,
loadOp: undefined,
storeOp: undefined,
clearValue: clearValue,
};
const colorAttachments = [colorAttachment];
const renderDesc = {
label: "",
colorAttachments: colorAttachments,
depthStencilAttachment: undefined,
occlusionQuerySet: undefined,
timestampWrites: undefined,
maxDrawCount: undefined,
};
iface.wgpuCommandEncoderBeginRenderPass = (commandEncoderIdx, descriptorPtr) => {
const nextInChain = mem.loadPtr(descriptorPtr + 0);
const labelLen = mem.loadUint(descriptorPtr + 8);
const count = mem.loadUint(descriptorPtr + 12);
const caPtr = mem.loadPtr(descriptorPtr + 16);
const dsPtr = mem.loadPtr(descriptorPtr + 20);
const occPtr = mem.loadPtr(descriptorPtr + 24);
const tsPtr = mem.loadPtr(descriptorPtr + 28);
if (nextInChain !== 0 || labelLen !== 0 || count !== 1 ||
dsPtr !== 0 || occPtr !== 0 || tsPtr !== 0) {
return origBeginRender(commandEncoderIdx, descriptorPtr);
}
const aNext = mem.loadPtr(caPtr + 0);
const viewIdx = mem.loadPtr(caPtr + 4);
const resolveIdx = mem.loadPtr(caPtr + 12);
if (aNext !== 0 || resolveIdx !== 0) {
return origBeginRender(commandEncoderIdx, descriptorPtr);
}
const depthSlice = mem.loadU32(caPtr + 8);
colorAttachment.view = viewIdx > 0 ? webgpu.textureViews.get(viewIdx) : undefined;
colorAttachment.resolveTarget = undefined;
colorAttachment.depthSlice = depthSlice === 0xFFFFFFFF ? undefined : depthSlice;
colorAttachment.loadOp = webgpu.enumeration("LoadOp", caPtr + 16);
colorAttachment.storeOp = webgpu.enumeration("StoreOp", caPtr + 20);
clearValue.r = mem.loadF64(caPtr + 24 + 0);
clearValue.g = mem.loadF64(caPtr + 24 + 8);
clearValue.b = mem.loadF64(caPtr + 24 + 16);
clearValue.a = mem.loadF64(caPtr + 24 + 24);
const encoder = webgpu.commandEncoders.get(commandEncoderIdx);
return webgpu.renderPassEncoders.create(encoder.beginRenderPass(renderDesc));
};
const unwrap = (src) => (typeof src === "bigint" ? Number(src) : src);
iface.wgpuQueueWriteBuffer = (queueIdx, bufferIdx, bufferOffset, dataPtr, size) => {
const queue = webgpu.queues.get(queueIdx);
const buffer = webgpu.buffers.get(bufferIdx);
const sz = unwrap(size);
queue.writeBuffer(buffer.buffer, unwrap(bufferOffset), mem.memory.buffer, dataPtr >>> 0, sz);
};
const submitArr = [];
iface.wgpuQueueSubmit = (queueIdx, commandCount, commandsPtr) => {
const queue = webgpu.queues.get(queueIdx);
const count = unwrap(commandCount);
submitArr.length = count;
let p = commandsPtr;
for (let i = 0; i < count; i += 1) {
submitArr[i] = webgpu.commandBuffers.get(mem.loadPtr(p));
p += 4;
}
queue.submit(submitArr);
};
}