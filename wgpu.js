(function() {
const EMPTY_U32 = Object.freeze([]);
const STATUS_SUCCESS = 1;
const STATUS_ERROR = 2;
const ENUMS = {
FeatureName: [undefined, "core-features-and-limits", "depth-clip-control", "depth32float-stencil8", "texture-compression-bc", "texture-compression-bc-sliced-3d", "texture-compression-etc2", "texture-compression-astc", "texture-compression-astc-sliced-3d", "timestamp-query", "indirect-first-instance", "shader-f16", "rg11b10ufloat-renderable", "bgra8unorm-storage", "float32-filterable", "float32-blendable", "clip-distances", "dual-source-blending", "subgroups", "texture-formats-tier1", "texture-formats-tier2", "primitive-index", "texture-component-swizzle" ],
StoreOp: [undefined, "store", "discard", ],
LoadOp: [undefined, "load", "clear", ],
BufferBindingType: [null, undefined, "uniform", "storage", "read-only-storage", ],
SamplerBindingType: [null, undefined, "filtering", "non-filtering", "comparison", ],
TextureSampleType: [null, undefined, "float", "unfilterable-float", "depth", "sint", "uint", ],
TextureViewDimension: [undefined, "1d", "2d", "2d-array", "cube", "cube-array", "3d", ],
StorageTextureAccess: [null, undefined, "write-only", "read-only", "read-write", ],
TextureFormat: [undefined, "r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32float", "r32uint", "r32sint", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rgb9e5ufloat", "rg32float", "rg32uint", "rg32sint", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32float", "rgba32uint", "rgba32sint", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb", ],
QueryType: [undefined, "occlusion", "timestamp", ],
VertexStepMode: [undefined, "vertex", "instance", ],
VertexFormat: [undefined, "uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-2", "unorm8x4-bgra" ],
PrimitiveTopology: [undefined, "point-list", "line-list", "line-strip", "triangle-list", "triangle-strip", ],
IndexFormat: [undefined, "uint16", "uint32", ],
FrontFace: [undefined, "ccw", "cw", ],
CullMode: [undefined, "none", "front", "back", ],
AddressMode: [undefined, "clamp-to-edge", "repeat", "mirror-repeat", ],
FilterMode: [undefined, "nearest", "linear", ],
MipmapFilterMode: [undefined, "nearest", "linear", ],
CompareFunction: [undefined, "never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always", ],
TextureDimension: [undefined, "1d", "2d", "3d", ],
ErrorType: [undefined, "no-error", "validation", "out-of-memory", "internal", "unknown", ],
WGSLLanguageFeatureName: [undefined, "readonly_and_readwrite_storage_textures", "packed_4x8_integer_dot_product", "unrestricted_pointer_parameters", "pointer_composite_access", "uniform_buffer_standard_layout", "subgroup_id", "texture_and_sampler_let", "subgroup_uniformity", "texture_formats_tier1" ],
PowerPreference: [undefined, "low-power", "high-performance", ],
CompositeAlphaMode: ["auto", "opaque", "premultiplied", "unpremultiplied", "inherit", ],
StencilOperation: [undefined, "keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap", ],
BlendOperation: ["add", "subtract", "reverse-subtract", "min", "max", ],
BlendFactor: [undefined, "zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha" ],
PresentMode: [undefined, "fifo", "fifo-relaxed", "immediate", "mailbox", ],
TextureAspect: [undefined, "all", "stencil-only", "depth-only"],
DeviceLostReason: [undefined, "unknown", "destroyed", "callback-cancelled", "failed-creation"],
BufferMapState: [undefined, "unmapped", "pending", "mapped"],
OptionalBool: [false, true, undefined],
ComponentSwizzle: [undefined, "0", "1", "r", "g", "b", "a"],
PredefinedColorSpace: [undefined, "srgb", "display-p3"],
ToneMappingMode: [undefined, "standard", "extended"],
FeatureLevel: [undefined, "compatibility", "core"],
TextureViewDimensions: [undefined, "1d", "2d", "2d-array", "cube", "cube-array", "3d"],
BackendType: [undefined, null, "WebGPU", "D3D11", "D3D12", "Metal", "Vulkan", "OpenGL", "OpenGLES"],
AdapterType: [undefined, "DiscreteGPU", "IntegratedGPU", "CPU", "Unknown"],
RequestDeviceStatus: [undefined, "Success", "CallbackCancelled", "Error"],
MapAsyncStatus: [undefined, "Success", "CallbackCancelled", "Error", "Aborted"],
CreatePipelineAsyncStatus: [undefined, "Success", "CallbackCancelled", "ValidationError", "InternalError"],
PopErrorScopeStatus: [undefined, "Success", "CallbackCancelled", "Error"],
RequestAdapterStatus: [undefined, "Success", "CallbackCancelled", "Unavailable", "Error"],
QueueWorkDoneStatus: [undefined, "Success", "CallbackCancelled", "Error"],
CompilationInfoRequestStatus: [undefined, "Success", "CallbackCancelled"],
};
class WebGPUInterface {
constructor(mem) {
this.mem = mem;
this.sizes = {
Color: [32, 8],
BufferBindingLayout: [24, 8],
SamplerBindingLayout: [8, 4],
TextureBindingLayout: [16, 4],
StorageTextureBindingLayout: [16, 4],
StringView: [2*this.mem.intSize, this.mem.intSize],
ConstantEntry: [this.mem.intSize === 8 ? 32 : 24, 8],
ComputeState: [8 + this.mem.intSize*4, this.mem.intSize],
VertexBufferLayout: [16 + this.mem.intSize*2, 8],
VertexAttribute: [24, 8],
VertexState: [8 + this.mem.intSize*6, this.mem.intSize],
PrimitiveState: [24, 4],
MultisampleState: [16, 4],
StencilFaceState: [16, 4],
ColorTargetState: [24, 8],
BlendComponent: [12, 4],
TexelCopyBufferLayout: [16, 8],
Origin3D: [12, 4],
QueueDescriptor: [this.mem.intSize*3, this.mem.intSize],
CallbackInfo: [20, 4],
UncapturedErrorCallbackInfo: [16, 4],
RenderPassColorAttachment: [56, 8],
BindGroupEntry: [40, 8],
BindGroupLayoutEntry: [88, 8],
Extent3D: [12, 4],
CompilationMessage: [this.mem.intSize == 8 ? 64 : 48, 8],
};
this.instances = new WebGPUObjectManager("Instance", this.mem);
this.adapters = new WebGPUObjectManager("Adapter", this.mem);
this.bindGroups = new WebGPUObjectManager("BindGroup", this.mem);
this.bindGroupLayouts = new WebGPUObjectManager("BindGroupLayout", this.mem);
this.buffers = new WebGPUObjectManager("Buffer", this.mem);
this.devices = new WebGPUObjectManager("Device", this.mem);
this.commandBuffers = new WebGPUObjectManager("CommandBuffer", this.mem);
this.commandEncoders = new WebGPUObjectManager("CommandEncoder", this.mem);
this.computePassEncoders = new WebGPUObjectManager("ComputePassEncoder", this.mem);
this.renderPassEncoders = new WebGPUObjectManager("RenderPassEncoder", this.mem);
this.querySets = new WebGPUObjectManager("QuerySet", this.mem);
this.computePipelines = new WebGPUObjectManager("ComputePipeline", this.mem);
this.pipelineLayouts = new WebGPUObjectManager("PipelineLayout", this.mem);
this.queues = new WebGPUObjectManager("Queue", this.mem);
this.renderBundles = new WebGPUObjectManager("RenderBundle", this.mem);
this.renderBundleEncoders = new WebGPUObjectManager("RenderBundleEncoder", this.mem);
this.renderPipelines = new WebGPUObjectManager("RenderPipeline", this.mem);
this.samplers = new WebGPUObjectManager("Sampler", this.mem);
this.shaderModules = new WebGPUObjectManager("ShaderModule", this.mem);
this.surfaces = new WebGPUObjectManager("Surface", this.mem);
this.textures = new WebGPUObjectManager("Texture", this.mem);
this.textureViews = new WebGPUObjectManager("TextureView", this.mem);
this.externalTextures = new WebGPUObjectManager("ExternalTexture", this.mem);
this.zeroMessageAddr = 0;
}
struct(start) {
let offset = start;
return (size, alignment = null) => {
if (alignment === null) {
if (Array.isArray(size)) {
[size, alignment] = size;
} else {
alignment = size;
}
}
offset = Math.ceil(offset / alignment) * alignment;
let currentOffset = offset;
offset += size;
return currentOffset;
};
}
uint(src) {
if (this.mem.intSize == 8) {
return BigInt(src);
} else if (this.mem.intSize == 4) {
return src;
} else {
throw new Error("unreachable");
}
}
unwrapBigInt(src) {
if (typeof src == "number") {
return src;
}
const MAX_SAFE_INTEGER = 9007199254740991n;
if (typeof src != "bigint") {
throw new TypeError(`unwrapBigInt got invalid param of type ${typeof src}`);
}
if (src > MAX_SAFE_INTEGER) {
throw new Error(`unwrapBigInt precision would be lost converting ${src}`);
}
return Number(src);
}
assert(condition, message = "assertion failure") {
if (!condition) {
throw new Error(message);
}
}
array(count, start, decoder, stride) {
if (count == 0) {
return [];
}
this.assert(start != 0);
const out = [];
for (let i = 0; i < count; i += 1) {
out.push(decoder.call(this, start));
start += stride;
}
return out;
}
enumeration(name, ptr) {
const int = this.mem.loadI32(ptr);
return ENUMS[name][int];
}
genericGetFeatures(features, ptr) {
this.assert(ptr != 0);
const availableFeatures = [];
ENUMS.FeatureName.forEach((feature, value) => {
if (!feature) {
return;
}
if (features.has(feature)) {
availableFeatures.push(value);
}
});
if (availableFeatures.length === 0) {
return;
}
const featuresAddr = this.mem.exports.wgpu_alloc(availableFeatures.length * 4);
this.assert(featuresAddr != 0);
let off = this.struct(ptr);
this.mem.storeUint(off(this.mem.intSize), availableFeatures.length);
this.mem.storeI32(off(4), featuresAddr);
off = this.struct(featuresAddr);
for (let i = 0; i < availableFeatures.length; i += 1) {
this.mem.storeI32(off(4), availableFeatures[i]);
}
}
genericGetLimits(limits, supportedLimitsPtr) {
this.assert(supportedLimitsPtr != 0);
const off = this.struct(supportedLimitsPtr);
off(4);
this.mem.storeU32(off(4), limits.maxTextureDimension1D);
this.mem.storeU32(off(4), limits.maxTextureDimension2D);
this.mem.storeU32(off(4), limits.maxTextureDimension3D);
this.mem.storeU32(off(4), limits.maxTextureArrayLayers);
this.mem.storeU32(off(4), limits.maxBindGroups);
this.mem.storeU32(off(4), limits.maxBindGroupsPlusVertexBuffers);
this.mem.storeU32(off(4), limits.maxBindingsPerBindGroup);
this.mem.storeU32(off(4), limits.maxDynamicUniformBuffersPerPipelineLayout);
this.mem.storeU32(off(4), limits.maxDynamicStorageBuffersPerPipelineLayout);
this.mem.storeU32(off(4), limits.maxSampledTexturesPerShaderStage);
this.mem.storeU32(off(4), limits.maxSamplersPerShaderStage);
this.mem.storeU32(off(4), limits.maxStorageBuffersPerShaderStage);
this.mem.storeU32(off(4), limits.maxStorageTexturesPerShaderStage);
this.mem.storeU32(off(4), limits.maxUniformBuffersPerShaderStage);
this.mem.storeU64(off(8), limits.maxUniformBufferBindingSize);
this.mem.storeU64(off(8), limits.maxStorageBufferBindingSize);
this.mem.storeU32(off(4), limits.minUniformBufferOffsetAlignment);
this.mem.storeU32(off(4), limits.minStorageBufferOffsetAlignment);
this.mem.storeU32(off(4), limits.maxVertexBuffers);
this.mem.storeU64(off(8), limits.maxBufferSize);
this.mem.storeU32(off(4), limits.maxVertexAttributes);
this.mem.storeU32(off(4), limits.maxVertexBufferArrayStride);
this.mem.storeU32(off(4), limits.maxInterStageShaderVariables);
this.mem.storeU32(off(4), limits.maxColorAttachments);
this.mem.storeU32(off(4), limits.maxColorAttachmentBytesPerSample);
this.mem.storeU32(off(4), limits.maxComputeWorkgroupStorageSize);
this.mem.storeU32(off(4), limits.maxComputeInvocationsPerWorkgroup);
this.mem.storeU32(off(4), limits.maxComputeWorkgroupSizeX);
this.mem.storeU32(off(4), limits.maxComputeWorkgroupSizeY);
this.mem.storeU32(off(4), limits.maxComputeWorkgroupSizeZ);
this.mem.storeU32(off(4), limits.maxComputeWorkgroupsPerDimension);
return STATUS_SUCCESS;
}
genericGetAdapterInfo(infoPtr, info) {
this.assert(infoPtr != 0);
const off = this.struct(infoPtr);
off(4); const storeString = (start, str) => {
const len = new TextEncoder().encode(str).length;
const strAddr = this.mem.exports.wgpu_alloc(len);
this.mem.storeString(strAddr, str);
this.mem.storeI32(start, strAddr);
this.mem.storeUint(start + this.mem.intSize, len);
};
storeString(off(this.sizes.StringView), info.vendor);
storeString(off(this.sizes.StringView), info.architecture);
storeString(off(this.sizes.StringView), info.device);
storeString(off(this.sizes.StringView), info.description);
this.mem.storeI32(off(4), ENUMS.BackendType.indexOf("WebGPU"));
this.mem.storeI32(off(4), ENUMS.AdapterType.indexOf("Unknown"));
off(4); off(4); this.mem.storeI32(off(4), info.subGroupMinSize);
this.mem.storeI32(off(4), info.subGroupMaxSize);
return STATUS_SUCCESS;
}
FeatureNamePtr(ptr) {
return this.FeatureName(this.mem.loadI32(ptr));
}
FeatureName(featureInt) {
return ENUMS.FeatureName[featureInt];
}
RequiredLimitsPtr(ptr) {
const start = this.mem.loadPtr(ptr);
if (start == 0) {
return undefined;
}
return this.Limits(start + this.mem.intSize);
}
Limits(start) {
const limitU32 = (ptr) => {
const value = this.mem.loadU32(ptr);
if (value == 0xFFFFFFFF) { return undefined;
}
return value;
};
const limitU64 = (ptr) => {
const part1 = this.mem.loadU32(ptr);
const part2 = this.mem.loadU32(ptr + 4);
if (part1 != 0xFFFFFFFF || part2 != 0xFFFFFFFF) { return this.mem.loadU64(ptr);
}
return undefined;
};
const off = this.struct(start);
off(4);
return {
maxTextureDimension1D: limitU32(off(4)),
maxTextureDimension2D: limitU32(off(4)),
maxTextureDimension3D: limitU32(off(4)),
maxTextureArrayLayers: limitU32(off(4)),
maxBindGroups: limitU32(off(4)),
maxBindGroupsPlusVertexBuffers: limitU32(off(4)),
maxBindingsPerBindGroup: limitU32(off(4)),
maxDynamicUniformBuffersPerPipelineLayout: limitU32(off(4)),
maxDynamicStorageBuffersPerPipelineLayout: limitU32(off(4)),
maxSampledTexturesPerShaderStage: limitU32(off(4)),
maxSamplersPerShaderStage: limitU32(off(4)),
maxStorageBuffersPerShaderStage: limitU32(off(4)),
maxStorageTexturesPerShaderStage: limitU32(off(4)),
maxUniformBuffersPerShaderStage: limitU32(off(4)),
maxUniformBufferBindingSize: limitU64(off(8)),
maxStorageBufferBindingSize: limitU64(off(8)),
minUniformBufferOffsetAlignment: limitU32(off(4)),
minStorageBufferOffsetAlignment: limitU32(off(4)),
maxVertexBuffers: limitU32(off(4)),
maxBufferSize: limitU64(off(8)),
maxVertexAttributes: limitU32(off(4)),
maxVertexBufferArrayStride: limitU32(off(4)),
maxInterStageShaderVariables: limitU32(off(4)),
maxColorAttachments: limitU32(off(4)),
maxColorAttachmentBytesPerSample: limitU32(off(4)),
maxComputeWorkgroupStorageSize: limitU32(off(4)),
maxComputeInvocationsPerWorkgroup: limitU32(off(4)),
maxComputeWorkgroupSizeX: limitU32(off(4)),
maxComputeWorkgroupSizeY: limitU32(off(4)),
maxComputeWorkgroupSizeZ: limitU32(off(4)),
maxComputeWorkgroupsPerDimension: limitU32(off(4)),
};
}
QueueDescriptor(start) {
return {
label: this.StringView(start + 4),
};
}
PassTimestampWritesPtr(ptr) {
const start = this.mem.loadPtr(ptr);
if (start == 0) {
return undefined;
}
const off = this.struct(start);
off(4); return {
querySet: this.querySets.get(this.mem.loadPtr(off(4))),
beginningOfPassWriteIndex: this.mem.loadU32(off(4)),
endOfPassWriteIndex: this.mem.loadU32(off(4)),
};
}
RenderPassColorAttachment(start) {
const off = this.struct(start);
off(4);
const viewIdx = this.mem.loadPtr(off(4));
let depthSlice = this.mem.loadU32(off(4));
if (depthSlice == 0xFFFFFFFF) { depthSlice = undefined;
}
const resolveTargetIdx = this.mem.loadPtr(off(4));
return {
view: viewIdx > 0 ? this.textureViews.get(viewIdx) : undefined,
resolveTarget: resolveTargetIdx > 0 ? this.textureViews.get(resolveTargetIdx) : undefined,
depthSlice: depthSlice,
loadOp: this.enumeration("LoadOp", off(4)),
storeOp: this.enumeration("StoreOp", off(4)),
clearValue: this.Color(off(this.sizes.Color)),
};
}
Color(start) {
const off = this.struct(start);
return {
r: this.mem.loadF64(off(8)),
g: this.mem.loadF64(off(8)),
b: this.mem.loadF64(off(8)),
a: this.mem.loadF64(off(8)),
};
}
RenderPassDepthStencilAttachmentPtr(ptr) {
const start = this.mem.loadPtr(ptr);
if (start == 0) {
return undefined;
}
const off = this.struct(start);
off(4); return {
view: this.textureViews.get(this.mem.loadPtr(off(4))),
depthLoadOp: this.enumeration("LoadOp", off(4)),
depthStoreOp: this.enumeration("StoreOp", off(4)),
depthClearValue: this.mem.loadF32(off(4)),
depthReadOnly: this.mem.loadB32(off(4)),
stencilLoadOp: this.enumeration("LoadOp", off(4)),
stencilStoreOp: this.enumeration("StoreOp", off(4)),
stencilClearValue: this.mem.loadF32(off(4)),
stencilReadOnly: this.mem.loadB32(off(4)),
};
}
QuerySet(ptr) {
ptr = this.mem.loadPtr(ptr);
if (ptr == 0) {
return undefined;
}
return this.querySets.get(ptr);
}
Origin3D(start) {
return {
x: this.mem.loadU32(start + 0),
y: this.mem.loadU32(start + 4),
z: this.mem.loadU32(start + 8),
};
}
Extent3D(start) {
return {
width: this.mem.loadU32(start + 0),
height: this.mem.loadU32(start + 4),
depthOrArrayLayers: this.mem.loadU32(start + 8),
};
}
BindGroupEntry(start) {
const buffer = this.mem.loadPtr(start + 8);
const sampler = this.mem.loadPtr(start + 32);
const textureView = this.mem.loadPtr(start + 36);
let resource;
if (buffer > 0) {
resource = {
buffer: this.buffers.get(buffer).buffer,
offset: this.mem.loadU64(start + 16),
size: this.mem.loadU64(start + 24),
}
} else if (sampler > 0) {
resource = this.samplers.get(sampler);
} else if (textureView > 0) {
resource = this.textureViews.get(textureView);
}
return {
binding: this.mem.loadU32(start + 4),
resource: resource,
};
}
BindGroupLayoutEntry(start) {
const off = this.struct(start);
off(4);
const entry = {
binding: this.mem.loadU32(off(4)),
visibility: this.mem.loadU64(off(8)),
bindingArraySize: this.mem.loadU32(off(4)),
buffer: this.BufferBindingLayout(off(this.sizes.BufferBindingLayout)),
sampler: this.SamplerBindingLayout(off(this.sizes.SamplerBindingLayout)),
texture: this.TextureBindingLayout(off(this.sizes.TextureBindingLayout)),
storageTexture: this.StorageTextureBindingLayout(off(this.sizes.StorageTextureBindingLayout)),
};
if (!entry.buffer.type) {
entry.buffer = undefined;
}
if (!entry.sampler.type) {
entry.sampler = undefined;
}
if (!entry.texture.sampleType) {
entry.texture = undefined;
}
if (!entry.storageTexture.access) {
entry.storageTexture = undefined;
}
return entry;
}
BufferBindingLayout(start) {
return {
type: this.enumeration("BufferBindingType", start + 4),
hasDynamicOffset: this.mem.loadB32(start + 8),
minBindingSize: this.mem.loadU64(start + 16),
};
}
SamplerBindingLayout(start) {
return {
type: this.enumeration("SamplerBindingType", start + 4),
};
}
TextureBindingLayout(start) {
return {
sampleType: this.enumeration("TextureSampleType", start + 4),
viewDimension: this.enumeration("TextureViewDimension", start + 8),
multisampled: this.mem.loadB32(start + 12),
};
}
StorageTextureBindingLayout(start) {
return {
access: this.enumeration("StorageTextureAccess", start + 4),
format: this.enumeration("TextureFormat", start + 8),
viewDimension: this.enumeration("TextureViewDimension", start + 12),
};
}
ComputeState(start) {
const off = this.struct(start);
off(4);
const shaderModule = this.shaderModules.get(this.mem.loadPtr(off(4)));
const entryPoint = this.StringView(off(this.sizes.StringView));
const constantsArray = this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.ConstantEntry,
this.sizes.ConstantEntry[0],
);
return {
module: shaderModule,
entryPoint: entryPoint,
constants: constantsArray.reduce((prev, curr) => {
prev[curr.key] = curr.value;
return prev;
}, {}),
};
}
ConstantEntry(start) {
const off = this.struct(start);
off(4);
return {
key: this.StringView(off(this.sizes.StringView)),
value: this.mem.loadF64(off(8)),
};
}
ComputePipelineDescriptor(start) {
const off = this.struct(start);
off(4);
const label = this.StringView(off(this.sizes.StringView));
const layoutIdx = this.mem.loadPtr(off(4));
return {
label: label,
layout: layoutIdx > 0 ? this.pipelineLayouts.get(layoutIdx) : "auto",
compute: this.ComputeState(off(this.sizes.ComputeState)),
};
}
VertexState(start) {
const off = this.struct(start);
off(4);
const shaderModuleIdx = this.mem.loadPtr(off(4));
const entryPoint = this.StringView(off(this.sizes.StringView));
const constantsArray = this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.ConstantEntry,
this.sizes.ConstantEntry[0],
);
return {
module: this.shaderModules.get(shaderModuleIdx),
entryPoint: entryPoint,
constants: constantsArray.reduce((prev, curr) => {
prev[curr.key] = curr.value;
return prev;
}, {}),
buffers: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.VertexBufferLayout,
this.sizes.VertexBufferLayout[0],
),
};
}
VertexBufferLayout(start) {
const off = this.struct(start);
off(4); const stepMode = this.enumeration("VertexStepMode", off(4));
return {
arrayStride: this.mem.loadU64(off(8)),
stepMode: stepMode,
attributes: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.VertexAttribute,
this.sizes.VertexAttribute[0],
),
};
}
VertexAttribute(start) {
const off = this.struct(start);
off(4); return {
format: this.enumeration("VertexFormat", off(4)),
offset: this.mem.loadU64(off(8)),
shaderLocation: this.mem.loadU32(off(4)),
};
}
PrimitiveState(start) {
const off = this.struct(start);
off(4);
return {
topology: this.enumeration("PrimitiveTopology", off(4)),
stripIndexFormat: this.enumeration("IndexFormat", off(4)),
frontFace: this.enumeration("FrontFace", off(4)),
cullMode: this.enumeration("CullMode", off(4)),
unclippedDepth: this.mem.loadB32(off(4)),
};
}
RenderPipelineDescriptor(start) {
const off = this.struct(start);
off(4);
const label = this.StringView(off(this.sizes.StringView));
const layoutIdx = this.mem.loadPtr(off(4));
return {
label: label,
layout: layoutIdx > 0 ? this.pipelineLayouts.get(layoutIdx) : "auto",
vertex: this.VertexState(off(this.sizes.VertexState)),
primitive: this.PrimitiveState(off(this.sizes.PrimitiveState)),
depthStencil: this.DepthStencilStatePtr(off(4)),
multisample: this.MultisampleState(off(this.sizes.MultisampleState)),
fragment: this.FragmentStatePtr(off(4)),
};
}
DepthStencilStatePtr(ptr) {
const start = this.mem.loadPtr(ptr);
if (start == 0) {
return undefined;
}
const off = this.struct(start);
off(4);
return {
format: this.enumeration("TextureFormat", off(4)),
depthWriteEnabled: this.enumeration("OptionalBool", off(4)),
depthCompare: this.enumeration("CompareFunction", off(4)),
stencilFront: this.StencilFaceState(off(this.sizes.StencilFaceState)),
stencilBack: this.StencilFaceState(off(this.sizes.StencilFaceState)),
stencilReadMask: this.mem.loadU32(off(4)),
stencilWriteMask: this.mem.loadU32(off(4)),
depthBias: this.mem.loadI32(off(4)),
depthBiasSlopeScale: this.mem.loadF32(off(4)),
depthBiasClamp: this.mem.loadF32(off(4)),
};
}
StencilFaceState(start) {
return {
compare: this.enumeration("CompareFunction", start + 0),
failOp: this.enumeration("StencilOperation", start + 4),
depthFailOp: this.enumeration("StencilOperation", start + 8),
passOp: this.enumeration("StencilOperation", start + 12),
};
}
MultisampleState(start) {
return {
count: this.mem.loadU32(start + 4),
mask: this.mem.loadU32(start + 8),
alphaToCoverageEnabled: this.mem.loadB32(start + 12),
};
}
FragmentStatePtr(ptr) {
const start = this.mem.loadPtr(ptr);
if (start == 0) {
return undefined;
}
const off = this.struct(start);
off(4);
const shaderModule = this.shaderModules.get(this.mem.loadPtr(off(4)));
const entryPoint = this.StringView(off(this.sizes.StringView));
const constantsArray = this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.ConstantEntry,
this.sizes.ConstantEntry[0],
);
return {
module: shaderModule,
entryPoint: entryPoint,
constants: constantsArray.reduce((prev, curr) => {
prev[curr.key] = curr.value;
return prev;
}, {}),
targets: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.ColorTargetState,
this.sizes.ColorTargetState[0],
),
};
}
ColorTargetState(start) {
const off = this.struct(start);
off(4);
return {
format: this.enumeration("TextureFormat", off(4)),
blend: this.BlendStatePtr(off(4)),
writeMask: this.mem.loadU64(off(8)),
};
}
BlendStatePtr(ptr) {
const start = this.mem.loadPtr(ptr);
if (start == 0) {
return undefined;
}
const off = this.struct(start);
return {
color: this.BlendComponent(off(this.sizes.BlendComponent)),
alpha: this.BlendComponent(off(this.sizes.BlendComponent)),
};
}
BlendComponent(start) {
return {
operation: this.enumeration("BlendOperation", start + 0),
srcFactor: this.enumeration("BlendFactor", start + 4),
dstFactor: this.enumeration("BlendFactor", start + 8),
};
}
TexelCopyBufferInfo(start) {
const off = this.struct(start);
const layout = this.TexelCopyBufferLayout(off(this.sizes.TexelCopyBufferLayout));
const bufferIdx = this.mem.loadPtr(off(4));
return {
buffer: this.buffers.get(bufferIdx).buffer,
offset: layout.offset,
bytesPerRow: layout.bytesPerRow,
rowsPerImage: layout.rowsPerImage,
};
}
TexelCopyBufferLayout(start) {
const off = this.struct(start);
return {
offset: this.mem.loadU64(off(8)),
bytesPerRow: this.mem.loadU32(off(4)),
rowsPerImage: this.mem.loadU32(off(4)),
};
}
TexelCopyTextureInfo(start) {
const off = this.struct(start);
return {
texture: this.textures.get(this.mem.loadPtr(off(4))),
mipLevel: this.mem.loadU32(off(4)),
origin: this.Origin3D(off(this.sizes.Origin3D)),
aspect: this.enumeration("TextureAspect", off(4)),
};
}
StringView(start) {
const data = this.mem.loadPtr(start);
return this.mem.loadString(data, this.mem.loadUint(start + this.mem.intSize));
}
CallbackInfoPtr(ptr) {
const start = this.mem.loadPtr(ptr);
if (start === 0) {
return null;
}
return CallbackInfo(start);
}
CallbackInfo(start) {
const off = this.struct(start);
off(4);
off(4);
return {
callback: this.mem.exports.__indirect_function_table.get(this.mem.loadPtr(off(4))),
userdata1: this.mem.loadPtr(off(4)),
userdata2: this.mem.loadPtr(off(4)),
};
}
UncapturedErrorCallbackInfo(start) {
const off = this.struct(start);
off(4);
return {
callback: this.mem.exports.__indirect_function_table.get(this.mem.loadPtr(off(4))),
userdata1: this.mem.loadPtr(off(4)),
userdata2: this.mem.loadPtr(off(4)),
};
}
callCallback(callback, args) {
args.push(callback.userdata1);
args.push(callback.userdata2);
callback.callback(...args);
}
zeroMessageArg() {
if (this.zeroMessageAddr > 0) {
return this.zeroMessageAddr;
}
this.zeroMessageAddr = this.mem.exports.wgpu_alloc(this.sizes.StringView[0]);
return this.zeroMessageAddr;
}
makeMessageArg(message) {
if (message.length == 0) {
return this.zeroMessageArg();
}
const messageLength = new TextEncoder().encode(message).length;
const stringSize = this.sizes.StringView[0];
const addr = this.mem.exports.wgpu_alloc(stringSize + messageLength);
const messageAddr = addr + stringSize;
this.mem.storeI32(addr, messageAddr);
this.mem.storeUint(addr + this.mem.intSize, messageLength);
this.mem.storeString(messageAddr, message);
return addr;
}
getInterface() {
return {
wgpuCreateInstance: (descriptorPtr) => {
if (!navigator.gpu) {
console.error("WebGPU is not supported by this browser");
return 0;
}
return this.instances.create({});
},
wgpuGetInstanceFeatures: (featuresPtr) => {
},
wgpuGetInstanceLimits: (limitsPtr) => {
},
wgpuHasInstanceFeature: (feature) => {
return false;
},
wgpuGetProcAddress: (procNamePtr, procNameLen) => {
console.error(`unimplemented: wgpuGetProcAddress`);
return 0;
},
wgpuAdapterGetFeatures: (adapterIdx, featuresPtr) => {
const adapter = this.adapters.get(adapterIdx);
this.genericGetFeatures(adapter.features, featuresPtr);
},
wgpuAdapterGetInfo: (adapterIdx, infoPtr) => {
return this.genericGetAdapterInfo(infoPtr);
},
wgpuAdapterGetLimits: (adapterIdx, limitsPtr) => {
const adapter = this.adapters.get(adapterIdx);
return this.genericGetLimits(adapter.limits, limitsPtr);
},
wgpuAdapterHasFeature: (adapterIdx, featureInt) => {
const adapter = this.adapters.get(adapterIdx);
return adapter.features.has(ENUMS.FeatureName[featureInt]);
},
wgpuAdapterRequestDevice: (adapterIdx, descriptorPtr, callbackInfoPtr) => {
const adapter = this.adapters.get(adapterIdx);
const off = this.struct(descriptorPtr);
off(4);
let descriptor;
if (descriptorPtr != 0) {
descriptor = {
label: this.StringView(off(this.sizes.StringView)),
requiredFeatures: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.FeatureNamePtr,
4,
),
requiredLimits: this.RequiredLimitsPtr(off(4)),
defaultQueue: this.QueueDescriptor(off(this.sizes.QueueDescriptor)),
};
}
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
const deviceLostCallbackInfo = this.CallbackInfo(off(this.sizes.CallbackInfo));
const uncapturedErrorCallbackInfo = this.UncapturedErrorCallbackInfo(off(this.sizes.UncapturedErrorCallbackInfo));
adapter.requestDevice(descriptor)
.catch((e) => {
const messageAddr = this.makeMessageArg(e.message);
this.callCallback(callbackInfo, [ENUMS.RequestDeviceStatus.indexOf("Error"), messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
})
.then((device) => {
const deviceIdx = this.devices.create(device);
if (deviceLostCallbackInfo.callback !== null) {
device.lost.then((info) => {
const reason = ENUMS.DeviceLostReason.indexOf(info.reason);
const devicePtr = this.mem.exports.wgpu_alloc(4);
this.mem.storeI32(devicePtr, deviceIdx);
const messageAddr = this.makeMessageArg(info.message);
this.callCallback(deviceLostCallbackInfo, [devicePtr, reason, messageAddr]);
this.mem.exports.wgpu_free(devicePtr);
this.mem.exports.wgpu_free(messageAddr);
});
}
if (uncapturedErrorCallbackInfo.callback !== null) {
device.onuncapturederror = (ev) => {
let status;
if (ev.error instanceof GPUValidationError) {
status = ENUMS.ErrorType.indexOf("validation");
} else if (ev.error instanceof GPUOutOfMemoryError) {
status = ENUMS.ErrorType.indexOf("out-of-memory");
} else if (ev.error instanceof GPUInternalError) {
status = ENUMS.ErrorType.indexOf("internal");
} else {
status = ENUMS.ErrorType.indexOf("unknown");
}
const messageAddr = this.makeMessageArg(ev.error.message);
this.callCallback(uncapturedErrorCallbackInfo, [deviceIdx, status, messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
};
}
this.callCallback(callbackInfo, [ENUMS.ErrorType.indexOf("no-error"), deviceIdx, this.zeroMessageArg()]);
});
return BigInt(0);
},
...this.adapters.interface(),
wgpuAdapterInfoFreeMembers: (infoPtr) => {
},
...this.bindGroups.interface(true),
...this.bindGroupLayouts.interface(true),
wgpuBufferDestroy: (bufferIdx) => {
const buffer = this.buffers.get(bufferIdx);
buffer.buffer.destroy();
},
wgpuBufferGetConstMappedRange: (bufferIdx, offset, size) => {
const buffer = this.buffers.get(bufferIdx);
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
this.assert(!buffer.mapping, "buffer already mapped");
const range = buffer.buffer.getMappedRange(offset, size);
const ptr = this.mem.exports.wgpu_alloc(range.byteLength);
const mapping = new Uint8Array(this.mem.memory.buffer, ptr, size);
mapping.set(new Uint8Array(range));
buffer.mapping = { range: range, ptr: ptr, size: range.byteLength };
return ptr;
},
wgpuBufferGetMapState: (bufferIdx) => {
const buffer = this.buffers.get(bufferIdx);
return ENUMS.BufferMapState.indexOf(buffer.mapState);
},
wgpuBufferGetMappedRange: (bufferIdx, offset, size) => {
const buffer = this.buffers.get(bufferIdx);
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
this.assert(!buffer.mapping, "buffer already mapped");
const range = buffer.buffer.getMappedRange(offset, size);
const ptr = this.mem.exports.wgpu_alloc(range.byteLength);
const mapping = new Uint8Array(this.mem.memory.buffer, ptr, size);
mapping.set(new Uint8Array(range));
buffer.mapping = { range: range, ptr: ptr, size: range.byteLength };
return ptr;
},
wgpuBufferGetSize: (bufferIdx) => {
const buffer = this.buffers.get(bufferIdx);
return BigInt(buffer.buffer.size);
},
wgpuBufferGetUsage: (bufferIdx) => {
const buffer = this.buffers.get(bufferIdx);
return buffer.buffer.usage;
},
wgpuBufferMapAsync: (bufferIdx, mode, offset, size, callbackInfoPtr) => {
const buffer = this.buffers.get(bufferIdx);
mode = this.unwrapBigInt(mode);
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
buffer.buffer.mapAsync(mode, offset, size)
.catch((e) => {
const messageAddr = this.makeMessageArg(e.message);
this.callCallback(callbackInfo, [ENUMS.MapAsyncStatus.indexOf("Error"), messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
})
.then(() => {
this.callCallback(callbackInfo, [ENUMS.MapAsyncStatus.indexOf("Success"), this.zeroMessageArg()]);
});
return BigInt(0);
},
wgpuBufferReadMappedRange: (bufferIdx, offset, ptr, size) => {
const buffer = this.buffers.get(bufferIdx);
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
this.assert(!buffer.mapping, "buffer already mapped");
const range = buffer.buffer.getMappedRange(offset, size);
const mapping = new Uint8Array(this.mem.memory.buffer, ptr, size);
mapping.set(new Uint8Array(range));
buffer.mapping = { range: range, ptr: ptr, size: range.byteLength };
return STATUS_SUCCESS;
},
wgpuBufferSetLabel: (bufferIdx, labelPtr, labelLen) => {
const buffer = this.buffers.get(bufferIdx);
buffer.buffer.label = this.mem.loadString(labelPtr, labelLen);
},
wgpuBufferUnmap: (bufferIdx) => {
const buffer = this.buffers.get(bufferIdx);
this.assert(buffer.mapping, "buffer not mapped");
const mapping = new Uint8Array(this.mem.memory.buffer, buffer.mapping.ptr, buffer.mapping.size);
(new Uint8Array(buffer.mapping.range)).set(mapping);
buffer.buffer.unmap();
this.mem.exports.wgpu_free(buffer.mapping.ptr);
buffer.mapping = null;
},
wgpuBufferWriteMappedRange: (bufferIdx, offset, ptr, size) => {
const buffer = this.buffers.get(bufferIdx);
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
this.assert(!buffer.mapping, "buffer already mapped");
const range = buffer.buffer.getMappedRange(offset, size);
const mapping = new Uint8Array(this.mem.memory.buffer, ptr, size);
(new Uint8Array(range)).set(mapping);
buffer.mapping = { range: range, ptr: ptr, size: range.byteLength };
return STATUS_SUCCESS;
},
...this.buffers.interface(),
...this.commandBuffers.interface(true),
wgpuCommandEncoderBeginComputePass: (commandEncoderIdx, descriptorPtr) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
let descriptor;
if (descriptorPtr != 0) {
const off = this.struct(descriptorPtr);
off(4);
descriptor = {
label: this.StringView(off(this.sizes.StringView)),
timestampWrites: this.PassTimestampWritesPtr(off(4)),
};
}
const computePassEncoder = commandEncoder.beginComputePass(descriptor);
return this.computePassEncoders.create(computePassEncoder);
},
wgpuCommandEncoderBeginRenderPass: (commandEncoderIdx, descriptorPtr) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
let maxDrawCount = undefined;
const nextInChain = this.mem.loadPtr(off(4));
if (nextInChain != 0) {
const nextInChainType = this.mem.loadI32(nextInChain + 4);
if (nextInChainType == 0x00000003) {
maxDrawCount = this.mem.loadU64(nextInChain + 8);
}
}
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
colorAttachments: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.RenderPassColorAttachment,
this.sizes.RenderPassColorAttachment[0],
),
depthStencilAttachment: this.RenderPassDepthStencilAttachmentPtr(off(4)),
occlusionQuerySet: this.QuerySet(off(4)),
timestampWrites: this.PassTimestampWritesPtr(off(4)),
maxDrawCount: maxDrawCount,
};
const renderPassEncoder = commandEncoder.beginRenderPass(descriptor);
return this.renderPassEncoders.create(renderPassEncoder);
},
wgpuCommandEncoderClearBuffer: (commandEncoderIdx, bufferIdx, offset, size) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
const buffer = this.buffers.get(bufferIdx);
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
commandEncoder.clearBuffer(buffer.buffer, offset, size);
},
wgpuCommandEncoderCopyBufferToBuffer: (commandEncoderIdx, sourceIdx, sourceOffset, destinationIdx, destinationOffset, size) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
const source = this.buffers.get(sourceIdx);
const destination = this.buffers.get(destinationIdx);
sourceOffset = this.unwrapBigInt(sourceOffset);
destinationOffset = this.unwrapBigInt(destinationOffset);
size = this.unwrapBigInt(size);
commandEncoder.copyBufferToBuffer(source.buffer, sourceOffset, destination.buffer, destinationOffset, size);
},
wgpuCommandEncoderCopyBufferToTexture: (commandEncoderIdx, sourcePtr, destinationPtr, copySizePtr) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
commandEncoder.copyBufferToTexture(
this.TexelCopyBufferInfo(sourcePtr),
this.TexelCopyTextureInfo(destinationPtr),
this.Extent3D(copySizePtr),
);
},
wgpuCommandEncoderCopyTextureToBuffer: (commandEncoderIdx, sourcePtr, destinationPtr, copySizePtr) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
commandEncoder.copyTextureToBuffer(
this.TexelCopyTextureInfo(sourcePtr),
this.TexelCopyBufferInfo(destinationPtr),
this.Extent3D(copySizePtr),
);
},
wgpuCommandEncoderCopyTextureToTexture: (commandEncoderIdx, sourcePtr, destinationPtr, copySizePtr) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
commandEncoder.copyTextureToTexture(
this.TexelCopyTextureInfo(sourcePtr),
this.TexelCopyTextureInfo(destinationPtr),
this.Extent3D(copySizePtr),
);
},
wgpuCommandEncoderFinish: (commandEncoderIdx, descriptorPtr) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
let descriptor;
if (descriptorPtr != 0) {
descriptor = {
label: this.StringView(descriptorPtr + 4),
};
}
const commandBuffer = commandEncoder.finish(descriptor);
return this.commandBuffers.create(commandBuffer);
},
wgpuCommandEncoderInsertDebugMarker: (commandEncoderIdx, markerLabelPtr, markerLabelLen) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
commandEncoder.insertDebugMarker(this.mem.loadString(markerLabelPtr, markerLabelLen));
},
wgpuCommandEncoderPopDebugGroup: (commandEncoderIdx) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
commandEncoder.popDebugGroup();
},
wgpuCommandEncoderPushDebugGroup: (commandEncoderIdx, groupLabelPtr, groupLabelLen) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
commandEncoder.pushDebugGroup(this.mem.loadString(groupLabelPtr, groupLabelLen));
},
wgpuCommandEncoderResolveQuerySet: (commandEncoderIdx, querySetIdx, firstQuery, queryCount, destinationIdx, destinationOffset) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
const querySet = this.querySets.get(querySetIdx);
const destination = this.buffers.get(destinationIdx);
destinationOffset = this.unwrapBigInt(destinationOffset);
commandEncoder.resolveQuerySet(querySet, firstQuery, queryCount, destination.buffer, destinationOffset);
},
wgpuCommandEncoderWriteTimestamp: (commandEncoderIdx, querySetIdx, queryIndex) => {
const commandEncoder = this.commandEncoders.get(commandEncoderIdx);
const querySet = this.querySets.get(querySetIdx);
commandEncoder.writeTimestamp(querySet, queryIndex);
},
...this.commandEncoders.interface(true),
wgpuComputePassEncoderDispatchWorkgroups: (computePassEncoderIdx, workgroupCountX, workgroupCountY, workgroupCountZ) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
computePassEncoder.dispatchWorkgroups(workgroupCountX, workgroupCountY, workgroupCountZ);
},
wgpuComputePassEncoderDispatchWorkgroupsIndirect: (computePassEncoderIdx, indirectBufferIdx, indirectOffset) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
const indirectBuffer = this.buffers.get(indirectBufferIdx);
indirectOffset = this.unwrapBigInt(indirectOffset);
computePassEncoder.dispatchWorkgroupsIndirect(indirectBuffer.buffer, indirectOffset);
},
wgpuComputePassEncoderEnd: (computePassEncoderIdx) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
computePassEncoder.end();
},
wgpuComputePassEncoderInsertDebugMarker: (computePassEncoderIdx, markerLabelPtr, markerLabelLen) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
computePassEncoder.insertDebugMarker(this.mem.loadString(markerLabelPtr, markerLabelLen));
},
wgpuComputePassEncoderPopDebugGroup: (computePassEncoderIdx) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
computePassEncoder.popDebugGroup();
},
wgpuComputePassEncoderPushDebugGroup: (computePassEncoderIdx, groupLabelPtr, groupLabelLen) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
computePassEncoder.pushDebugGroup(this.mem.loadString(groupLabelPtr, groupLabelLen));
},
wgpuComputePassEncoderSetBindGroup: (computePassEncoderIdx, groupIndex, groupIdx, dynamicOffsetCount, dynamicOffsetsPtr) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
dynamicOffsetCount = this.unwrapBigInt(dynamicOffsetCount);
let bindGroup;
if (groupIdx != 0) {
bindGroup = this.bindGroups.get(groupIdx);
}
let dynamicOffsets = EMPTY_U32;
if (dynamicOffsetCount > 0) {
dynamicOffsets = [];
for (let i = 0; i < dynamicOffsetCount; i += 1) {
dynamicOffsets.push(this.mem.loadU32(dynamicOffsetsPtr));
dynamicOffsetsPtr += 4;
}
}
computePassEncoder.setBindGroup(groupIndex, bindGroup, dynamicOffsets);
},
wgpuComputePassEncoderSetPipeline: (computePassEncoderIdx, pipelineIdx) => {
const computePassEncoder = this.computePassEncoders.get(computePassEncoderIdx);
const pipeline = this.computePipelines.get(pipelineIdx);
computePassEncoder.setPipeline(pipeline);
},
...this.computePassEncoders.interface(true),
wgpuComputePipelineGetBindGroupLayout: (computePipelineIdx, groupIndex) => {
const computePipeline = this.computePipelines.get(computePipelineIdx);
const bindGroupLayout = computePipeline.getBindGroupLayout(groupIndex);
return this.bindGroupLayouts.create(bindGroupLayout);
},
...this.computePipelines.interface(true),
wgpuDeviceCreateBindGroup: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
off(4);
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
layout: this.bindGroupLayouts.get(this.mem.loadPtr(off(4))),
entries: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.BindGroupEntry,
this.sizes.BindGroupEntry[0],
),
};
const bindGroup = device.createBindGroup(descriptor);
return this.bindGroups.create(bindGroup);
},
wgpuDeviceCreateBindGroupLayout: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
off(4);
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
entries: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.BindGroupLayoutEntry,
this.sizes.BindGroupLayoutEntry[0],
),
};
const bindGroupLayout = device.createBindGroupLayout(descriptor);
return this.bindGroupLayouts.create(bindGroupLayout);
},
wgpuDeviceCreateBuffer: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
off(4);
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
usage: this.mem.loadU64(off(8)),
size: this.mem.loadU64(off(8)),
mappedAtCreation: this.mem.loadB32(off(4)),
};
const buffer = device.createBuffer(descriptor);
return this.buffers.create({buffer: buffer, mapping: null});
},
wgpuDeviceCreateCommandEncoder: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
let descriptor;
if (descriptor != 0) {
descriptor = {
label: this.StringView(descriptorPtr + 4),
};
}
const commandEncoder = device.createCommandEncoder(descriptor);
return this.commandEncoders.create(commandEncoder);
},
wgpuDeviceCreateComputePipeline: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const computePipeline = device.createComputePipeline(this.ComputePipelineDescriptor(descriptorPtr));
return this.computePipelines.create(computePipeline);
},
wgpuDeviceCreateComputePipelineAsync: (deviceIdx, descriptorPtr, callbackInfoPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
device.createComputePipelineAsync(this.ComputePipelineDescriptor(descriptorPtr))
.catch((e) => {
const messageAddr = this.makeMessageArg(e.message);
this.callCallback(callbackInfo, [ENUMS.CreatePipelineAsyncStatus.indexOf("ValidationError"), 0, messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
})
.then((computePipeline) => {
const pipelineIdx = this.computePipelines.create(computePipeline);
this.callCallback(callbackInfo, [ENUMS.CreatePipelineAsyncStatus.indexOf("Success"), pipelineIdx, this.zeroMessageArg()]);
});
return BigInt(0);
},
wgpuDeviceCreatePipelineLayout: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
off(4);
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
bindGroupLayouts: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
(ptr) => this.bindGroupLayouts.get(this.mem.loadPtr(ptr)),
4,
),
};
const pipelineLayout = device.createPipelineLayout(descriptor);
return this.pipelineLayouts.create(pipelineLayout);
},
wgpuDeviceCreateQuerySet: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
off(4);
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
type: this.enumeration("QueryType", off(4)),
count: this.mem.loadU32(off(4)),
};
const querySet = device.createQuerySet(descriptor);
return this.querySets.create(querySet);
},
wgpuDeviceCreateRenderBundleEncoder: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
off(4);
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
colorFormats: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
this.TextureFormat,
4,
),
depthStencilFormat: this.enumeration("TextureFormat", off(4)),
sampleCount: this.mem.loadU32(off(4)),
depthReadOnly: this.mem.loadB32(off(4)),
stencilReadOnly: this.mem.loadB32(off(4)),
};
const renderBundleEncoder = device.createRenderBundleEncoder(descriptor);
return this.renderBundleEncoders.create(renderBundleEncoder);
},
wgpuDeviceCreateRenderPipeline: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const descriptor = this.RenderPipelineDescriptor(descriptorPtr);
const renderPipeline = device.createRenderPipeline(descriptor);
return this.renderPipelines.create(renderPipeline);
},
wgpuDeviceCreateRenderPipelineAsync: (deviceIdx, descriptorPtr, callbackInfoPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
device.createRenderPipelineAsync(this.RenderPipelineDescriptor(descriptorPtr))
.catch((e) => {
const messageAddr = this.makeMessageArg(e.message);
this.callCallback(callbackInfo, [ENUMS.CreatePipelineAsyncStatus.indexOf("Unknown"), 0, messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
})
.then((renderPipeline) => {
const renderPipelineIdx = this.renderPipelines.create(renderPipeline);
this.callCallback(callbackInfo, [ENUMS.CreatePipelineAsyncStatus.indexOf("Success"), renderPipelineIdx, this.zeroMessageArg()]);
});
return BigInt(0);
},
wgpuDeviceCreateSampler: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
let descriptor;
if (descriptorPtr != 0) {
const off = this.struct(descriptorPtr);
off(4);
descriptor = {
label: this.StringView(off(this.sizes.StringView)),
addressModeU: this.enumeration("AddressMode", off(4)),
addressModeV: this.enumeration("AddressMode", off(4)),
addressModeW: this.enumeration("AddressMode", off(4)),
magFilter: this.enumeration("FilterMode", off(4)),
minFilter: this.enumeration("FilterMode", off(4)),
mipmapFilter: this.enumeration("MipmapFilterMode", off(4)),
lodMinClamp: this.mem.loadF32(off(4)),
lodMaxClamp: this.mem.loadF32(off(4)),
compare: this.enumeration("CompareFunction", off(4)),
maxAnisotropy: this.mem.loadU16(off(2)),
};
}
const sampler = device.createSampler(descriptor);
return this.samplers.create(sampler);
},
wgpuDeviceCreateShaderModule: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
const nextInChain = this.mem.loadPtr(off(4));
const chainOff = this.struct(nextInChain);
chainOff(4);
const nextInChainType = this.mem.loadI32(chainOff(4));
if (nextInChainType != 2) {
throw new TypeError(`Descriptor type should be 'ShaderSourceWGSL', got ${nextInChainType}`);
}
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
code: this.StringView(chainOff(this.sizes.StringView)),
};
const shaderModule = device.createShaderModule(descriptor);
return this.shaderModules.create(shaderModule);
},
wgpuDeviceCreateTexture: (deviceIdx, descriptorPtr) => {
const device = this.devices.get(deviceIdx);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
off(4);
const descriptor = {
label: this.StringView(off(this.sizes.StringView)),
usage: this.mem.loadU64(off(8)),
dimension: this.enumeration("TextureDimension", off(4)),
size: this.Extent3D(off(this.sizes.Extent3D)),
format: this.enumeration("TextureFormat", off(4)),
mipLevelCount: this.mem.loadU32(off(4)),
sampleCount: this.mem.loadU32(off(4)),
viewFormats: this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
(ptr) => this.enumeration("TextureFormat", ptr),
4,
),
};
const texture = device.createTexture(descriptor);
return this.textures.create(texture);
},
wgpuDeviceDestroy: (deviceIdx) => {
const device = this.devices.get(deviceIdx);
device.destroy();
},
wgpuDeviceGetAdapterInfo: (deviceIdx, infoPtr) => {
return this.genericGetAdapterInfo(infoPtr);
},
wgpuDeviceGetFeatures: (deviceIdx, featuresPtr) => {
const device = this.devices.get(deviceIdx);
return this.genericGetFeatures(device.features, featuresPtr);
},
wgpuDeviceGetLimits: (deviceIdx, limitsPtr) => {
const device = this.devices.get(deviceIdx);
return this.genericGetLimits(device.limits, limitsPtr);
},
wgpuDeviceGetLostFuture: (deviceIdx) => {
return BigInt(0);
},
wgpuDeviceGetQueue: (deviceIdx) => {
const device = this.devices.get(deviceIdx);
return this.queues.create(device.queue);
},
wgpuDeviceHasFeature: (deviceIdx, featureInt) => {
const device = this.devices.get(deviceIdx);
return device.features.has(ENUMS.FeatureName[featureInt]);
},
wgpuDevicePopErrorScope: (deviceIdx, callbackInfoPtr) => {
const device = this.devices.get(deviceIdx);
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
device.popErrorScope()
.catch((e) => {
const messageAddr = this.makeMessageArg(e.message);
this.callCallback(callbackInfo, [ENUMS.PopErrorScopeStatus.indexOf("Error"), ENUMS.ErrorType.indexOf("unknown"), messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
})
.then((error) => {
if (!error) {
this.callCallback(callbackInfo, [ENUMS.PopErrorScopeStatus.indexOf("Success"), ENUMS.ErrorType.indexOf("no-error"), this.zeroMessageArg()]);
return;
}
let status;
if (error instanceof GPUValidationError) {
status = ENUMS.ErrorType.indexOf("validation");
} else if (error instanceof GPUOutOfMemoryError) {
status = ENUMS.ErrorType.indexOf("out-of-memory");
} else if (error instanceof GPUInternalError) {
status = ENUMS.ErrorType.indexOf("internal");
} else {
status = ENUMS.ErrorType.indexOf("unknown");
}
const messageAddr = error.message;
this.callCallback(callbackInfo, [ENUMS.PopErrorScopeStatus.indexOf("Success"), status, messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
});
return BigInt(0);
},
wgpuDevicePushErrorScope: (deviceIdx, filterInt) => {
const device = this.devices.get(deviceIdx);
device.pushErrorScope(ENUMS.ErrorFilter[filterInt]);
},
...this.devices.interface(true),
...this.externalTextures.interface(true),
wgpuInstanceCreateSurface: (instanceIdx, descriptorPtr) => {
this.assert(instanceIdx > 0);
this.assert(descriptorPtr != 0);
const off = this.struct(descriptorPtr);
const nextInChain = this.mem.loadPtr(off(4));
const chainOff = this.struct(nextInChain);
chainOff(4);
const nextInChainType = this.mem.loadI32(chainOff(4));
if (nextInChainType != 0x00040001) {
throw new TypeError(`Descriptor type should be 'SurfaceSourceCanvasHTMLSelector', got ${nextInChainType}`);
}
const selector = this.StringView(chainOff(this.sizes.StringView));
const surface = document.querySelector(selector);
if (!surface) {
throw new Error(`Selector '${selector}' did not match any element`);
}
if (!(surface instanceof HTMLCanvasElement)) {
throw new Error('Selector matches an element that is not a canvas');
}
return this.surfaces.create(surface);
},
wgpuInstanceGetWGSLLanguageFeatures: (instanceIdx, featuresPtr) => {
this.assert(featuresPtr != 0);
const availableFeatures = [];
ENUMS.WGSLLanguageFeatureName.forEach((feature, value) => {
if (!feature) {
return;
}
if (navigator.gpu.wgslLanguageFeatures.has(feature)) {
availableFeatures.push(value);
}
});
if (availableFeatures.length === 0) {
return;
}
const featuresAddr = this.mem.exports.wgpu_alloc(availableFeatures.length * 4);
this.assert(featuresAddr != 0);
let off = this.struct(featuresPtr);
this.mem.storeUint(off(this.mem.intSize), availableFeatures.length);
this.mem.storeI32(off(4), featuresAddr);
off = this.struct(featuresAddr);
for (let i = 0; i < availableFeatures.length; i += 1) {
this.mem.storeI32(off(4), availableFeatures[i]);
}
},
wgpuInstanceHasWGSLLanguageFeature: (instanceIdx, featureInt) => {
return navigator.gpu.wgslLanguageFeatures.has(ENUMS.WGSLLanguageFeatureName[featureInt]);
},
wgpuInstanceProcessEvents: (instanceIdx) => {
console.warn("unimplemented: wgpuInstanceProcessEvents");
},
wgpuInstanceRequestAdapter: (instanceIdx, optionsPtr, callbackInfoPtr) => {
this.assert(instanceIdx > 0);
let options;
if (optionsPtr != 0) {
const off = this.struct(optionsPtr);
let xrCompatible = undefined;
const nextInChain = this.mem.loadPtr(off(4));
if (nextInChain != 0) {
const nextInChainType = this.mem.loadI32(nextInChain + 4);
if (nextInChainType == 0x0000000B) {
xrCompatible = this.mem.loadB32(nextInChain + 8);
}
}
options = {
featureLevel: this.enumeration("FeatureLevel", off(4)),
powerPreference: this.enumeration("PowerPreference", off(4)),
forceFallbackAdapter: this.mem.loadB32(off(4)),
xrCompatible: xrCompatible,
};
}
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
navigator.gpu.requestAdapter(options)
.catch((e) => {
const messageAddr = this.makeMessageArg(e.message);
this.callCallback(callbackInfo, [ENUMS.RequestAdapterStatus.indexOf("Error"), null, messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
})
.then((adapter) => {
const adapterIdx = this.adapters.create(adapter);
this.callCallback(callbackInfo, [ENUMS.RequestAdapterStatus.indexOf("Success"), adapterIdx, this.zeroMessageArg()]);
});
return BigInt(0);
},
wgpuInstanceWaitAny: (instanceIdx, futureCount, futuresPtr, timeoutNS) => {
console.warn("unimplemented: wgpuInstanceProcessEvents");
return BigInt(0);
},
...this.instances.interface(false),
...this.pipelineLayouts.interface(true),
wgpuQuerySetDestroy: (querySetIdx) => {
const querySet = this.querySets.get(querySetIdx);
querySet.destroy();
},
wgpuQuerySetGetCount: (querySetIdx) => {
const querySet = this.querySets.get(querySetIdx);
return querySet.count;
},
wgpuQuerySetGetType: (querySetIdx) => {
const querySet = this.querySets.get(querySetIdx);
return ENUMS.QueryType.indexOf(querySet.type);
},
...this.querySets.interface(true),
wgpuQueueOnSubmittedWorkDone: (queueIdx, callbackInfoPtr) => {
const queue = this.queues.get(queueIdx);
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
queue.onSubmittedWorkDone()
.catch((e) => {
console.warn(e);
const messageAddr = this.makeMessageArg(e.message);
this.callCallback(callbackInfo, [ENUMS.QueueWorkDoneStatus.indexOf("Error"), messageAddr]);
this.mem.exports.wgpu_free(messageAddr);
})
.then(() => {
this.callCallback(callbackInfo, [ENUMS.QueueWorkDoneStatus.indexOf("Success"), this.zeroMessageArg()]);
});
return BigInt(0);
},
wgpuQueueSubmit: (queueIdx, commandCount, commandsPtr) => {
const queue = this.queues.get(queueIdx);
const count = this.unwrapBigInt(commandCount);
const commands = new Array(count);
for (let i = 0; i < count; i += 1) {
commands[i] = this.commandBuffers.get(this.mem.loadPtr(commandsPtr));
commandsPtr += 4;
}
queue.submit(commands);
},
wgpuQueueWriteBuffer: (queueIdx, bufferIdx, bufferOffset, dataPtr, size) => {
const queue = this.queues.get(queueIdx);
const buffer = this.buffers.get(bufferIdx);
bufferOffset = this.unwrapBigInt(bufferOffset);
size = this.unwrapBigInt(size);
queue.writeBuffer(buffer.buffer, bufferOffset, this.mem.loadBytes(dataPtr >>> 0, size), 0, size);
},
wgpuQueueWriteTexture: (queueIdx, destinationPtr, dataPtr, dataSize, dataLayoutPtr, writeSizePtr) => {
const queue = this.queues.get(queueIdx);
const destination = this.TexelCopyTextureInfo(destinationPtr);
dataSize = this.unwrapBigInt(dataSize);
const dataLayout = this.TexelCopyBufferLayout(dataLayoutPtr);
const writeSize = this.Extent3D(writeSizePtr);
queue.writeTexture(destination, this.mem.loadBytes(dataPtr, dataSize), dataLayout, writeSize);
},
...this.queues.interface(true),
...this.renderBundles.interface(true),
wgpuRenderBundleEncoderDraw: (renderBundleEncoderIdx, vertexCount, instanceCount, firstVertex, firstInstance) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
renderBundleEncoder.draw(vertexCount, instanceCount, firstVertex, firstInstance);
},
wgpuRenderBundleEncoderDrawIndexed: (renderBundleEncoderIdx, indexCount, instanceCount, firstIndex, baseVertex, firstInstance) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
renderBundleEncoder.drawIndexed(indexCount, instanceCount, firstIndex, baseVertex, firstInstance);
},
wgpuRenderBundleEncoderDrawIndexedIndirect: (renderBundleEncoderIdx, indirectBufferIdx, indirectOffset) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
indirectOffset = this.unwrapBigInt(indirectOffset);
const buffer = this.buffers.get(indirectBufferIdx);
renderBundleEncoder.drawIndexedIndirect(buffer.buffer, indirectOffset);
},
wgpuRenderBundleEncoderDrawIndirect: (renderBundleEncoderIdx, indirectBufferIdx, indirectOffset) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
indirectOffset = this.unwrapBigInt(indirectOffset);
const buffer = this.buffers.get(indirectBufferIdx);
renderBundleEncoder.drawIndirect(buffer.buffer, indirectOffset);
},
wgpuRenderBundleEncoderFinish: (renderBundleEncoderIdx, descriptorPtr) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
let descriptor;
if (descriptorPtr != 0) {
descriptor = {
label: this.StringView(descriptorPtr + 4),
};
}
const renderBundle = renderBundleEncoder.finish(descriptor);
return this.renderBundles.create(renderBundle);
},
wgpuRenderBundleEncoderInsertDebugMarker: (renderBundleEncoderIdx, markerLabelPtr, markerLabelLen) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
this.assert(markerLabelPtr != 0);
const markerLabel = this.mem.loadString(markerLabelPtr, markerLabelLen);
renderBundleEncoder.insertDebugMarker(markerLabel);
},
wgpuRenderBundleEncoderPopDebugGroup: (renderBundleEncoderIdx) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
renderBundleEncoder.popDebugGroup();
},
wgpuRenderBundleEncoderPushDebugGroup: (renderBundleEncoderIdx, groupLabelPtr, grouplabelLen) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
this.assert(groupLabelPtr!= 0);
const groupLabel = this.mem.loadString(groupLabelPtr, groupLabelLen);
renderBundleEncoder.pushDebugGroup(groupLabel);
},
wgpuRenderBundleEncoderSetBindGroup: (renderBundleEncoderIdx, groupIndex, groupIdx, dynamicOffsetCount, dynamicOffsetsPtr) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
let group;
if (groupIdx > 0) {
group = this.bindGroups.get(groupIdx);
}
dynamicOffsetCount = this.unwrapBigInt(dynamicOffsetCount);
const dynamicOffsets = this.array(
dynamicOffsetCount,
dynamicOffsetsPtr,
(ptr) => this.mem.loadU32(ptr),
4
);
renderBundleEncoder.setBindGroup(groupIndex, group, dynamicOffsets);
},
wgpuRenderBundleEncoderSetIndexBuffer: (renderBundleEncoderIdx, bufferIdx, formatInt, offset, size) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
const buffer = this.buffers.get(bufferIdx);
const format = ENUMS.IndexFormat[formatInt];
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
renderBundleEncoder.setIndexBuffer(buffer.buffer, format, offset, size);
},
wgpuRenderBundleEncoderSetPipeline: (renderBundleEncoderIdx, pipelineIdx) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
const pipeline = this.renderPipelines.get(pipelineIdx);
renderBundleEncoder.setPipeline(pipeline);
},
wgpuRenderBundleEncoderSetVertexBuffer: (renderBundleEncoderIdx, slot, bufferIdx, offset, size) => {
const renderBundleEncoder = this.renderBundleEncoders.get(renderBundleEncoderIdx);
let buffer;
if (bufferIdx > 0) {
buffer = this.buffers.get(bufferIdx).buffer;
}
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
renderBundleEncoder.setVertexBuffer(slot, buffer, offset, size);
},
...this.renderBundleEncoders.interface(true),
wgpuRenderPassEncoderBeginOcclusionQuery: (renderPassEncoderIdx, queryIndex) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.beginOcclusionQuery(queryIndex);
},
wgpuRenderPassEncoderDraw: (renderPassEncoderIdx, vertexCount, instanceCount, firstVertex, firstInstance) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.draw(vertexCount, instanceCount, firstVertex, firstInstance);
},
wgpuRenderPassEncoderDrawIndexed: (renderPassEncoderIdx, indexCount, instanceCount, firstIndex, baseVertex, firstInstance) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.drawIndexed(indexCount, instanceCount, firstIndex, baseVertex, firstInstance);
},
wgpuRenderPassEncoderDrawIndexedIndirect: (renderPassEncoderIdx, indirectBufferIdx, indirectOffset) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
const buffer = this.buffers.get(indirectBufferIdx);
indirectOffset = this.unwrapBigInt(indirectOffset);
renderPassEncoder.drawIndexedIndirect(buffer.buffer, indirectOffset);
},
wgpuRenderPassEncoderDrawIndirect: (renderPassEncoderIdx, indirectBufferIdx, indirectOffset) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
const buffer = this.buffers.get(indirectBufferIdx);
indirectOffset = this.unwrapBigInt(indirectOffset);
renderPassEncoder.drawIndirect(buffer.buffer, indirectOffset);
},
wgpuRenderPassEncoderEnd: (renderPassEncoderIdx) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.end();
},
wgpuRenderPassEncoderEndOcclusionQuery: (renderPassEncoderIdx) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.endOcclusionQuery();
},
wgpuRenderPassEncoderExecuteBundles: (renderPassEncoderIdx, bundleCount, bundlesPtr) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
bundleCount = this.unwrapBigInt(bundleCount);
const bundles = this.array(
bundleCount,
bundlesPtr,
(ptr) => this.renderBundles.get(this.mem.loadPtr(ptr)),
4,
);
renderPassEncoder.executeBundles(bundles);
},
wgpuRenderPassEncoderInsertDebugMarker: (renderPassEncoderIdx, markerLabelPtr, markerLabelLen) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
const markerLabel = this.mem.loadString(markerLabelPtr, markerLabelLen);
renderPassEncoder.insertDebugMarker(markerLabel);
},
wgpuRenderPassEncoderPopDebugGroup: (renderPassEncoderIdx) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.popDebugGroup();
},
wgpuRenderPassEncoderPushDebugGroup: (renderPassEncoderIdx, groupLabelPtr, groupLabelLen) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
const groupLabel = this.mem.loadString(groupLabelPtr, groupLabelLen);
renderPassEncoder.pushDebugGroup(groupLabel);
},
wgpuRenderPassEncoderSetBindGroup: (renderPassEncoderIdx, groupIndex, groupIdx, dynamicOffsetCount, dynamicOffsetsPtr) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
let group;
if (groupIdx > 0) {
group = this.bindGroups.get(groupIdx);
}
dynamicOffsetCount = this.unwrapBigInt(dynamicOffsetCount);
let dynamicOffsets = EMPTY_U32;
if (dynamicOffsetCount > 0) {
dynamicOffsets = [];
for (let i = 0; i < dynamicOffsetCount; i += 1) {
dynamicOffsets.push(this.mem.loadU32(dynamicOffsetsPtr));
dynamicOffsetsPtr += 4;
}
}
renderPassEncoder.setBindGroup(groupIndex, group, dynamicOffsets);
},
wgpuRenderPassEncoderSetBlendConstant: (renderPassEncoderIdx, colorPtr) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
this.assert(colorPtr != 0);
renderPassEncoder.setBlendConstant(this.Color(colorPtr));
},
wgpuRenderPassEncoderSetIndexBuffer: (renderPassEncoderIdx, bufferIdx, formatInt, offset, size) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
const buffer = this.buffers.get(bufferIdx);
const format = ENUMS.IndexFormat[formatInt];
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
renderPassEncoder.setIndexBuffer(buffer.buffer, format, offset, size);
},
wgpuRenderPassEncoderSetPipeline: (renderPassEncoderIdx, pipelineIdx) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
const pipeline = this.renderPipelines.get(pipelineIdx);
renderPassEncoder.setPipeline(pipeline);
},
wgpuRenderPassEncoderSetScissorRect: (renderPassEncoderIdx, x, y, width, height) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.setScissorRect(x, y, width, height);
},
wgpuRenderPassEncoderSetStencilReference: (renderPassEncoderIdx, reference) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.setStencilReference(reference);
},
wgpuRenderPassEncoderSetVertexBuffer: (renderPassEncoderIdx, slot, bufferIdx, offset, size) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
let buffer;
if (bufferIdx > 0) {
buffer = this.buffers.get(bufferIdx).buffer;
}
offset = this.unwrapBigInt(offset);
size = this.unwrapBigInt(size);
renderPassEncoder.setVertexBuffer(slot, buffer, offset, size);
},
wgpuRenderPassEncoderSetViewport: (renderPassEncoderIdx, x, y, width, height, minDepth, maxDepth) => {
const renderPassEncoder = this.renderPassEncoders.get(renderPassEncoderIdx);
renderPassEncoder.setViewport(x, y, width, height, minDepth, maxDepth);
},
...this.renderPassEncoders.interface(true),
wgpuRenderPipelineGetBindGroupLayout: (renderPipelineIdx, groupIndex) => {
const renderPipeline = this.renderPipelines.get(renderPipelineIdx);
const bindGroupLayout = renderPipeline.getBindGroupLayout(groupIndex);
return this.bindGroupLayouts.create(bindGroupLayout);
},
...this.renderPipelines.interface(true),
...this.samplers.interface(true),
wgpuShaderModuleGetCompilationInfo: (shaderModuleIdx, callbackInfoPtr) => {
const shaderModule = this.shaderModules.get(shaderModuleIdx);
const callbackInfo = this.CallbackInfo(callbackInfoPtr);
shaderModule.getCompilationInfo()
.catch((e) => {
console.warn(e);
this.callCallback(callbackInfo, [ENUMS.CompilationInfoRequestStatus.indexOf("CallbackCancelled"), null]);
})
.then((compilationInfo) => {
const ptrsToFree = [];
const compilationMessageSize = this.sizes.CompilationMessage[0];
const size = compilationInfo.messages.length * compilationMessageSize;
const addr = this.mem.exports.wgpu_alloc(size);
ptrsToFree.push(addr);
compilationInfo.messages.forEach((message, i) => {
const messageLength = new TextEncoder().encode(message.message).length;
const messageAddr = this.mem.exports.wgpu_alloc(messageLength);
ptrsToFree.push(messageAddr);
this.mem.storeString(messageAddr, message.message);
const off = this.struct(addr + (i * compilationMessageSize));
off(4);
const messageStart = off(this.sizes.StringView);
this.mem.storeI32(messageStart, messageAddr);
this.mem.storeUint(messageStart + this.mem.intSize, messageLength);
this.mem.storeI32(off(4), ENUMS.CompilationMessageType.indexOf(message.type));
this.mem.storeU64(off(8), message.lineNum);
this.mem.storeU64(off(8), message.linePos);
this.mem.storeU64(off(8), message.offset);
this.mem.storeU64(off(8), message.length);
});
const retAddr = this.mem.exports.wgpu_alloc(3*this.mem.intSize);
ptrsToFree.push(retAddr);
this.mem.storeUint(retAddr + this.mem.intSize, compilationInfo.messages.length);
this.mem.storeI32(retAddr + this.mem.intSize*2, addr);
this.callCallback(callbackInfo, [ENUMS.CompilationInfoRequestStatus.indexOf("Success"), retAddr]);
ptrsToFree.forEach(ptr => this.mem.exports.wgpu_free(ptr));
});
return BigInt(0);
},
...this.shaderModules.interface(true),
wgpuSupportedFeaturesFreeMembers: (supportedFeaturesCount, supportedFeaturesPtr) => {
this.mem.exports.wgpu_free(supportedFeaturesPtr);
},
wgpuSupportedInstanceFeaturesFreeMembers: (supportedFeaturesCount, supportedFeaturesPtr) => {
},
wgpuSupportedWGSLLanguageFeaturesFreeMembers: (supportedFeaturesCount, supportedFeaturesPtr) => {
this.mem.exports.wgpu_free(supportedFeaturesPtr);
},
wgpuSurfaceConfigure: (surfaceIdx, configPtr) => {
const surface = this.surfaces.get(surfaceIdx);
const context = surface.getContext("webgpu");
const off = this.struct(configPtr);
let colorSpace = undefined;
let toneMapping = undefined;
const nextInChain = this.mem.loadPtr(off(4));
if (nextInChain != 0) {
const colorManagementOff = this.struct(nextInChain);
colorManagementOff(4); const nextInChainType = this.mem.loadI32(colorManagementOff(4));
if (nextInChainType == 0x0000000A) {
colorSpace = this.enumeration("PredefinedColorSpace", colorManagementOff(4)) ?? "srgb";
toneMapping = {
mode: this.enumeration("ToneMappingMode", colorManagementOff(4)) ?? "standard",
};
}
}
const device = this.devices.get(this.mem.loadPtr(off(4)));
const format = this.enumeration("TextureFormat", off(4));
const usage = this.mem.loadU64(off(8));
const width = this.mem.loadU32(off(4));
const height = this.mem.loadU32(off(4));
const viewFormats = this.array(
this.mem.loadUint(off(this.mem.intSize)),
this.mem.loadPtr(off(4)),
(ptr) => this.enumeration("TextureFormat", ptr),
4,
);
const alphaMode = this.enumeration("CompositeAlphaMode", off(4));
const presentMode = this.enumeration("PresentMode", off(4));
surface.width = width;
surface.height = height;
const config = {
device: device,
format: format,
usage: usage,
viewFormats: viewFormats,
alphaMode: alphaMode,
presentMode: presentMode,
colorSpace: colorSpace,
toneMapping: toneMapping,
};
context.configure(config);
},
wgpuSurfaceGetCapabilities: (surfaceIdx, adapterIdx, capabilitiesPtr) => {
const off = this.struct(capabilitiesPtr);
off(4); off(8); const formatStr = navigator.gpu.getPreferredCanvasFormat();
const format = ENUMS.TextureFormat.indexOf(formatStr);
this.mem.storeUint(off(this.mem.intSize), 1);
const formatAddr = this.mem.exports.wgpu_alloc(4);
this.mem.storeI32(formatAddr, format);
this.mem.storeI32(off(4), formatAddr);
this.mem.storeUint(off(this.mem.intSize), 1);
const presentModesAddr = this.mem.exports.wgpu_alloc(4);
this.mem.storeI32(presentModesAddr, ENUMS.PresentMode.indexOf("fifo"));
this.mem.storeI32(off(4), presentModesAddr);
this.mem.storeUint(off(this.mem.intSize), 2);
const alphaModesAddr = this.mem.exports.wgpu_alloc(8);
this.mem.storeI32(alphaModesAddr + 0, ENUMS.CompositeAlphaMode.indexOf("opaque"));
this.mem.storeI32(alphaModesAddr + 4, ENUMS.CompositeAlphaMode.indexOf("premultiplied"));
this.mem.storeI32(off(4), alphaModesAddr);
return STATUS_SUCCESS;
},
wgpuSurfaceGetCurrentTexture: (surfaceIdx, texturePtr) => {
const surface = this.surfaces.get(surfaceIdx);
const context = surface.getContext('webgpu');
const texture = context.getCurrentTexture();
const textureIdx = this.textures.create(texture);
this.mem.storeI32(texturePtr + 4, textureIdx);
},
wgpuSurfacePresent: (surfaceIdx) => {
},
wgpuSurfaceUnconfigure: (surfaceIdx) => {
const surface = this.surfaces.get(surfaceIdx);
surface.getContext('webgpu').unconfigure();
},
...this.surfaces.interface(true),
wgpuSurfaceCapabilitiesFreeMembers: (surfaceCapabilitiesPtr) => {
const off = this.struct(surfaceCapabilitiesPtr);
off(4); off(8); off(this.mem.intSize); const formatsAddr = this.mem.loadPtr(off(4));
this.mem.exports.wgpu_free(formatsAddr);
off(this.mem.intSize); const presentModesAddr = this.mem.loadPtr(off(4));
this.mem.exports.wgpu_free(presentModesAddr);
off(this.mem.intSize); const alphaModesAddr = this.mem.loadPtr(off(4));
this.mem.exports.wgpu_free(alphaModesAddr);
},
wgpuTextureCreateView: (textureIdx, descriptorPtr) => {
const texture = this.textures.get(textureIdx);
let descriptor;
if (descriptorPtr != 0) {
const off = this.struct(descriptorPtr);
let swizzle = undefined;
const nextInChain = this.mem.loadPtr(off(4));
if (nextInChain != 0) {
const swizzleOff = this.struct(nextInChain);
swizzleOff(4); const nextInChainType = this.mem.loadI32(swizzleOff(4));
if (nextInChainType == 0x00000016) {
const r = this.enumeration("ComponentSwizzle", swizzleOff(4));
this.assert(r !== undefined);
const g = this.enumeration("ComponentSwizzle", swizzleOff(4));
this.assert(g !== undefined);
const b = this.enumeration("ComponentSwizzle", swizzleOff(4));
this.assert(b !== undefined);
const a = this.enumeration("ComponentSwizzle", swizzleOff(4));
this.assert(a !== undefined);
swizzle = r + g + b + a;
}
}
descriptor = {
label: this.StringView(off(this.sizes.StringView)),
format: this.enumeration("TextureFormat", off(4)),
dimension: this.enumeration("TextureViewDimension", off(4)),
baseMipLevel: this.mem.loadU32(off(4)),
mipLevelCount: this.mem.loadU32(off(4)),
baseArrayLayer: this.mem.loadU32(off(4)),
arrayLayerCount: this.mem.loadU32(off(4)),
aspect: this.enumeration("TextureAspect", off(4)),
usage: this.mem.loadU64(off(8)),
swizzle: swizzle,
};
if (descriptor.arrayLayerCount == 0xFFFFFFFF) {
descriptor.arrayLayerCount = undefined;
}
if (descriptor.mipLevelCount == 0xFFFFFFFF) {
descriptor.mipLevelCount = undefined;
}
}
const textureView = texture.createView(descriptor);
return this.textureViews.create(textureView);
},
wgpuTextureDestroy: (textureIdx) => {
const texture = this.textures.get(textureIdx);
texture.destroy();
},
wgpuTextureDepthOrArrayLayers: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return texture.depthOrArrayLayers;
},
wgpuTextureGetDimension: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return ENUMS.TextureDimension.indexOf(texture.dimension);
},
wgpuTextureGetFormat: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return ENUMS.TextureFormat.indexOf(texture.format);
},
wgpuTextureGetHeight: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return texture.height;
},
wgpuTextureGetMipLevelCount: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return texture.mipLevelCount;
},
wgpuTextureGetSampleCount: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return texture.sampleCount;
},
wgpuTextureGetTextureBindingViewDimension: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return ENUMS.TextureViewDimension.indexOf(texture.textureBindingViewDimension);
},
wgpuTextureGetUsage: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return texture.usage;
},
wgpuTextureGetWidth: (textureIdx) => {
const texture = this.textures.get(textureIdx);
return texture.width;
},
...this.textures.interface(true),
...this.textureViews.interface(true),
};
}
}
class WebGPUObjectManager {
constructor(name, mem) {
this.name = name;
this.mem = mem;
this.idx = 0;
this.objects = new Map();
this.free = [];
}
create(object) {
if (object === null) {
return 0;
}
let entry = this.free.pop();
if (entry === undefined) {
entry = { references: 1, object };
} else {
entry.references = 1;
entry.object = object;
}
this.objects.set(this.idx, entry);
this.idx += 1;
return this.idx;
}
get(idx) {
return this.objects.get(idx-1)?.object;
}
release(idx) {
if (idx === 0) {
return;
}
const entry = this.objects.get(idx-1);
if (entry !== undefined) {
entry.references -= 1;
if (entry.references == 0) {
this.objects.delete(idx-1);
entry.object = null; this.free.push(entry);
}
}
}
reference(idx) {
if (idx === 0) {
return;
}
const entry = this.objects.get(idx-1);
if (entry !== undefined) {
entry.references += 1;
}
}
interface(withLabelSetter = false) {
const inter = {};
inter[`wgpu${this.name}AddRef`] = this.reference.bind(this);
inter[`wgpu${this.name}Release`] = this.release.bind(this);
if (withLabelSetter) {
inter[`wgpu${this.name}SetLabel`] = (idx, labelPtr, labelLen) => {
const obj = this.get(idx);
obj.label = this.mem.loadString(labelPtr, labelLen);
};
}
return inter;
}
}
window.odin = window.odin || {};
window.odin.WebGPUInterface = WebGPUInterface;
})();