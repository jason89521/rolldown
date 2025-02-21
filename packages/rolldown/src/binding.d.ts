type MaybePromise<T> = T | Promise<T>
type Nullable<T> = T | null | undefined
type VoidNullable<T = void> = T | null | undefined | void
export type BindingStringOrRegex = string | RegExp

export declare class BindingLog {
  code: string
  message: string
}

export declare class BindingModuleInfo {
  id: string
  importers: Array<string>
  dynamicImporters: Array<string>
  importedIds: Array<string>
  dynamicallyImportedIds: Array<string>
  isEntry: boolean
  get code(): string | null
}

export declare class BindingOutputAsset {
  get fileName(): string
  get originalFileName(): string | null
  get source(): BindingAssetSource
  get name(): string | null
}

export declare class BindingOutputChunk {
  get isEntry(): boolean
  get isDynamicEntry(): boolean
  get facadeModuleId(): string | null
  get moduleIds(): Array<string>
  get exports(): Array<string>
  get fileName(): string
  get modules(): Record<string, BindingRenderedModule>
  get imports(): Array<string>
  get dynamicImports(): Array<string>
  get code(): string
  get map(): string | null
  get sourcemapFileName(): string | null
  get preliminaryFileName(): string
  get name(): string
}

export declare class BindingOutputs {
  get chunks(): Array<BindingOutputChunk>
  get assets(): Array<BindingOutputAsset>
}

export declare class BindingPluginContext {
  resolve(specifier: string, importer?: string | undefined | null, extraOptions?: BindingPluginContextResolveOptions | undefined | null): Promise<BindingPluginContextResolvedId | null>
  emitFile(file: BindingEmittedAsset): string
  getFileName(referenceId: string): string
  getModuleInfo(moduleId: string): BindingModuleInfo | null
  getModuleIds(): Array<string> | null
  addWatchFile(file: string): void
}

export declare class BindingTransformPluginContext {
  inner(): BindingPluginContext
}

export declare class BindingWatcher {
  close(): Promise<void>
  on(event: BindingWatcherEvent, listener: (data?: Record<string, string>) => void): void
}

export declare class Bundler {
  constructor(inputOptions: BindingInputOptions, outputOptions: BindingOutputOptions, parallelPluginsRegistry?: ParallelJsPluginRegistry | undefined | null)
  write(): Promise<BindingOutputs>
  generate(): Promise<BindingOutputs>
  scan(): Promise<void>
  close(): Promise<void>
  watch(): Promise<BindingWatcher>
}

export declare class ParallelJsPluginRegistry {
  id: number
  workerCount: number
  constructor(workerCount: number)
}

export interface AliasItem {
  find: string
  replacements: Array<string>
}

export interface ArrowFunctionsOptions {
  /**
   * This option enables the following:
   * * Wrap the generated function in .bind(this) and keeps uses of this inside the function as-is, instead of using a renamed this.
   * * Add a runtime check to ensure the functions are not instantiated.
   * * Add names to arrow functions.
   *
   * @default false
   */
  spec?: boolean
}

export interface BindingAdvancedChunksOptions {
  minSize?: number
  minShareCount?: number
  groups?: Array<BindingMatchGroup>
}

export interface BindingAliasPluginAlias {
  find: BindingStringOrRegex
  replacement: string
}

export interface BindingAliasPluginConfig {
  entries: Array<BindingAliasPluginAlias>
}

export interface BindingAssetSource {
  inner: string | Uint8Array
}

export interface BindingBuildImportAnalysisPluginConfig {
  preloadCode: string
  insertPreload: boolean
  optimizeModulePreloadRelativePaths: boolean
  renderBuiltUrl: boolean
  isRelativeBase: boolean
}

export interface BindingBuiltinPlugin {
  __name: BindingBuiltinPluginName
  options?: unknown
}

export declare enum BindingBuiltinPluginName {
  WasmHelperPlugin = 0,
  ImportGlobPlugin = 1,
  DynamicImportVarsPlugin = 2,
  ModulePreloadPolyfillPlugin = 3,
  ManifestPlugin = 4,
  LoadFallbackPlugin = 5,
  TransformPlugin = 6,
  WasmFallbackPlugin = 7,
  AliasPlugin = 8,
  JsonPlugin = 9,
  BuildImportAnalysisPlugin = 10,
  ReplacePlugin = 11
}

export interface BindingEmittedAsset {
  name?: string
  fileName?: string
  originalFileName?: string
  source: BindingAssetSource
}

export interface BindingExperimentalOptions {
  strictExecutionOrder?: boolean
  disableLiveBindings?: boolean
}

export interface BindingGeneralHookFilter {
  include?: Array<BindingStringOrRegex>
  exclude?: Array<BindingStringOrRegex>
}

export interface BindingGlobImportPluginConfig {
  root?: string
  restoreQueryExtension?: boolean
}

export interface BindingHookLoadOutput {
  code: string
  sideEffects?: BindingHookSideEffects
  map?: BindingSourcemap
  moduleType?: string
}

export interface BindingHookRenderChunkOutput {
  code: string
  map?: BindingSourcemap
}

export interface BindingHookResolveIdExtraArgs {
  custom?: number
  isEntry: boolean
  kind: 'import' | 'dynamic-import' | 'require-call'
}

export interface BindingHookResolveIdOutput {
  id: string
  external?: boolean
  sideEffects?: BindingHookSideEffects
}

export declare enum BindingHookSideEffects {
  True = 0,
  False = 1,
  NoTreeshake = 2
}

export interface BindingHookTransformOutput {
  code?: string
  sideEffects?: BindingHookSideEffects
  map?: BindingSourcemap
  moduleType?: string
}

export interface BindingInjectImportNamed {
  tagNamed: true
  imported: string
  alias?: string
  from: string
}

export interface BindingInjectImportNamespace {
  tagNamespace: true
  alias: string
  from: string
}

export interface BindingInputItem {
  name?: string
  import: string
}

export interface BindingInputOptions {
  external?: undefined | ((source: string, importer: string | undefined, isResolved: boolean) => boolean)
  input: Array<BindingInputItem>
  plugins: (BindingBuiltinPlugin | BindingPluginOptions | undefined)[]
  resolve?: BindingResolveOptions
  shimMissingExports?: boolean
  platform?: 'node' | 'browser' | 'neutral'
  logLevel?: BindingLogLevel
  onLog: (logLevel: 'debug' | 'warn' | 'info', log: BindingLog) => void
  cwd: string
  treeshake?: BindingTreeshake
  moduleTypes?: Record<string, string>
  define?: Array<[string, string]>
  inject?: Array<BindingInjectImportNamed | BindingInjectImportNamespace>
  experimental?: BindingExperimentalOptions
  profilerNames?: boolean
  jsx?: JsxOptions
  watch?: BindingWatchOption
}

export interface BindingJsonPluginConfig {
  stringify?: boolean
  isBuild?: boolean
}

export interface BindingJsonSourcemap {
  file?: string
  mappings?: string
  sourceRoot?: string
  sources?: Array<string | undefined | null>
  sourcesContent?: Array<string | undefined | null>
  names?: Array<string>
}

export declare enum BindingLogLevel {
  Silent = 0,
  Warn = 1,
  Info = 2,
  Debug = 3
}

export interface BindingManifestPluginConfig {
  root: string
  outPath: string
}

export interface BindingMatchGroup {
  name: string
  test?: BindingStringOrRegex
  priority?: number
  minSize?: number
  minShareCount?: number
}

export interface BindingModulePreloadPolyfillPluginConfig {
  skip?: boolean
}

export interface BindingNotifyOption {
  pollInterval?: number
  compareContents?: boolean
}

export interface BindingOutputOptions {
  name?: string
  entryFileNames?: string | ((chunk: PreRenderedChunk) => string)
  chunkFileNames?: string | ((chunk: PreRenderedChunk) => string)
  assetFileNames?: string
  banner?: (chunk: RenderedChunk) => MaybePromise<VoidNullable<string>>
  dir?: string
  esModule?: boolean | 'if-default-prop'
  exports?: 'default' | 'named' | 'none' | 'auto'
  extend?: boolean
  externalLiveBindings?: boolean
  footer?: (chunk: RenderedChunk) => MaybePromise<VoidNullable<string>>
  format?: 'es' | 'cjs' | 'iife' | 'umd'
  globals?: Record<string, string>
  inlineDynamicImports?: boolean
  intro?: (chunk: RenderedChunk) => MaybePromise<VoidNullable<string>>
  outro?: (chunk: RenderedChunk) => MaybePromise<VoidNullable<string>>
  plugins: (BindingBuiltinPlugin | BindingPluginOptions | undefined)[]
  sourcemap?: 'file' | 'inline' | 'hidden'
  sourcemapIgnoreList?: (source: string, sourcemapPath: string) => boolean
  sourcemapPathTransform?: (source: string, sourcemapPath: string) => string
  minify?: boolean
  advancedChunks?: BindingAdvancedChunksOptions
}

export interface BindingPluginContextResolvedId {
  id: string
  external: boolean
}

export interface BindingPluginContextResolveOptions {
  importKind?: 'import' | 'dynamic-import' | 'require-call'
  skipSelf?: boolean
  custom?: number
}

export interface BindingPluginHookMeta {
  order?: BindingPluginOrder
}

export interface BindingPluginOptions {
  name: string
  buildStart?: (ctx: BindingPluginContext) => MaybePromise<VoidNullable>
  buildStartMeta?: BindingPluginHookMeta
  resolveId?: (ctx: BindingPluginContext, specifier: string, importer: Nullable<string>, options: BindingHookResolveIdExtraArgs) => MaybePromise<VoidNullable<BindingHookResolveIdOutput>>
  resolveIdMeta?: BindingPluginHookMeta
  resolveIdFilter?: BindingGeneralHookFilter
  resolveDynamicImport?: (ctx: BindingPluginContext, specifier: string, importer: Nullable<string>) => MaybePromise<VoidNullable<BindingHookResolveIdOutput>>
  resolveDynamicImportMeta?: BindingPluginHookMeta
  load?: (ctx: BindingPluginContext, id: string) => MaybePromise<VoidNullable<BindingHookLoadOutput>>
  loadMeta?: BindingPluginHookMeta
  loadFilter?: BindingGeneralHookFilter
  transform?: (ctx:  BindingTransformPluginContext, id: string, code: string, module_type: BindingTransformHookExtraArgs) => MaybePromise<VoidNullable<BindingHookTransformOutput>>
  transformMeta?: BindingPluginHookMeta
  transformFilter?: BindingTransformHookFilter
  moduleParsed?: (ctx: BindingPluginContext, module: BindingModuleInfo) => MaybePromise<VoidNullable>
  moduleParsedMeta?: BindingPluginHookMeta
  buildEnd?: (ctx: BindingPluginContext, error: Nullable<string>) => MaybePromise<VoidNullable>
  buildEndMeta?: BindingPluginHookMeta
  renderChunk?: (ctx: BindingPluginContext, code: string, chunk: RenderedChunk) => MaybePromise<VoidNullable<BindingHookRenderChunkOutput>>
  renderChunkMeta?: BindingPluginHookMeta
  augmentChunkHash?: (ctx: BindingPluginContext, chunk: RenderedChunk) => MaybePromise<void | string>
  augmentChunkHashMeta?: BindingPluginHookMeta
  renderStart?: (ctx: BindingPluginContext) => void
  renderStartMeta?: BindingPluginHookMeta
  renderError?: (ctx: BindingPluginContext, error: string) => void
  renderErrorMeta?: BindingPluginHookMeta
  generateBundle?: (ctx: BindingPluginContext, bundle: BindingOutputs, isWrite: boolean) => MaybePromise<VoidNullable<JsChangedOutputs>>
  generateBundleMeta?: BindingPluginHookMeta
  writeBundle?: (ctx: BindingPluginContext, bundle: BindingOutputs) => MaybePromise<VoidNullable<JsChangedOutputs>>
  writeBundleMeta?: BindingPluginHookMeta
  closeBundle?: (ctx: BindingPluginContext) => MaybePromise<VoidNullable>
  closeBundleMeta?: BindingPluginHookMeta
  watchChange?: (ctx: BindingPluginContext, path: string, event: string) => MaybePromise<VoidNullable>
  watchChangeMeta?: BindingPluginHookMeta
  closeWatcher?: (ctx: BindingPluginContext) => MaybePromise<VoidNullable>
  closeWatcherMeta?: BindingPluginHookMeta
  banner?: (ctx: BindingPluginContext, chunk: RenderedChunk) => void
  bannerMeta?: BindingPluginHookMeta
  footer?: (ctx: BindingPluginContext, chunk: RenderedChunk) => void
  footerMeta?: BindingPluginHookMeta
  intro?: (ctx: BindingPluginContext, chunk: RenderedChunk) => void
  introMeta?: BindingPluginHookMeta
  outro?: (ctx: BindingPluginContext, chunk: RenderedChunk) => void
  outroMeta?: BindingPluginHookMeta
}

export declare enum BindingPluginOrder {
  Pre = 0,
  Post = 1
}

export interface BindingPluginWithIndex {
  index: number
  plugin: BindingPluginOptions
}

export interface BindingRenderedModule {
  code?: string
}

export interface BindingReplacePluginConfig {
  values: Record<string, string>
  delimiters?: [string, string]
  preventAssignment?: boolean
  objectGuards?: boolean
}

export interface BindingResolveOptions {
  alias?: Array<AliasItem>
  aliasFields?: Array<Array<string>>
  conditionNames?: Array<string>
  exportsFields?: Array<Array<string>>
  extensions?: Array<string>
  extensionAlias?: Array<ExtensionAliasItem>
  mainFields?: Array<string>
  mainFiles?: Array<string>
  modules?: Array<string>
  symlinks?: boolean
  tsconfigFilename?: string
}

export interface BindingSourcemap {
  inner: string | BindingJsonSourcemap
}

export interface BindingTransformHookExtraArgs {
  moduleType: string
}

export interface BindingTransformHookFilter {
  code?: BindingGeneralHookFilter
  moduleType?: Array<string>
  id?: BindingGeneralHookFilter
}

export interface BindingTransformPluginConfig {
  include?: Array<BindingStringOrRegex>
  exclude?: Array<BindingStringOrRegex>
  jsxInject?: string
  targets?: string
}

export interface BindingTreeshake {
  moduleSideEffects: string
}

export declare enum BindingWatcherEvent {
  Close = 0,
  Event = 1,
  ReStart = 2,
  Change = 3
}

export interface BindingWatchOption {
  skipWrite?: boolean
  notify?: BindingNotifyOption
  include?: Array<BindingStringOrRegex>
  exclude?: Array<BindingStringOrRegex>
}

export interface Es2015Options {
  /** Transform arrow functions into function expressions. */
  arrowFunction?: ArrowFunctionsOptions
}

export interface ExtensionAliasItem {
  target: string
  replacements: Array<string>
}

/** TypeScript Isolated Declarations for Standalone DTS Emit */
export declare function isolatedDeclaration(filename: string, sourceText: string, options?: IsolatedDeclarationsOptions | undefined | null): IsolatedDeclarationsResult

export interface IsolatedDeclarationsOptions {
  /**
   * Do not emit declarations for code that has an @internal annotation in its JSDoc comment.
   * This is an internal compiler option; use at your own risk, because the compiler does not check that the result is valid.
   *
   * Default: `false`
   *
   * See <https://www.typescriptlang.org/tsconfig/#stripInternal>
   */
  stripInternal?: boolean
  sourcemap?: boolean
}

export interface IsolatedDeclarationsResult {
  code: string
  map?: SourceMap
  errors: Array<string>
}

export interface JsChangedOutputs {
  chunks: Array<JsOutputChunk>
  assets: Array<JsOutputAsset>
  deleted: Array<string>
}

export interface JsOutputAsset {
  name?: string
  originalFileName?: string
  filename: string
  source: BindingAssetSource
}

export interface JsOutputChunk {
  name: string
  isEntry: boolean
  isDynamicEntry: boolean
  facadeModuleId?: string
  moduleIds: Array<string>
  exports: Array<string>
  filename: string
  modules: Record<string, BindingRenderedModule>
  imports: Array<string>
  dynamicImports: Array<string>
  code: string
  map?: BindingSourcemap
  sourcemapFilename?: string
  preliminaryFilename: string
}

/**
 * Configure how TSX and JSX are transformed.
 *
 * @see {@link https://babeljs.io/docs/babel-plugin-transform-react-jsx#options}
 */
export interface JsxOptions {
  /**
   * Decides which runtime to use.
   *
   * - 'automatic' - auto-import the correct JSX factories
   * - 'classic' - no auto-import
   *
   * @default 'automatic'
   */
  runtime?: 'classic' | 'automatic'
  /**
   * Emit development-specific information, such as `__source` and `__self`.
   *
   * @default false
   *
   * @see {@link https://babeljs.io/docs/babel-plugin-transform-react-jsx-development}
   */
  development?: boolean
  /**
   * Toggles whether or not to throw an error if an XML namespaced tag name
   * is used.
   *
   * Though the JSX spec allows this, it is disabled by default since React's
   * JSX does not currently have support for it.
   *
   * @default true
   */
  throwIfNamespace?: boolean
  /**
   * Enables `@babel/plugin-transform-react-pure-annotations`.
   *
   * It will mark top-level React method calls as pure for tree shaking.
   *
   * @see {@link https://babeljs.io/docs/en/babel-plugin-transform-react-pure-annotations}
   *
   * @default true
   */
  pure?: boolean
  /**
   * Replaces the import source when importing functions.
   *
   * @default 'react'
   */
  importSource?: string
  /**
   * Replace the function used when compiling JSX expressions. It should be a
   * qualified name (e.g. `React.createElement`) or an identifier (e.g.
   * `createElement`).
   *
   * Only used for `classic` {@link runtime}.
   *
   * @default 'React.createElement'
   */
  pragma?: string
  /**
   * Replace the component used when compiling JSX fragments. It should be a
   * valid JSX tag name.
   *
   * Only used for `classic` {@link runtime}.
   *
   * @default 'React.Fragment'
   */
  pragmaFrag?: string
  /**
   * When spreading props, use `Object.assign` directly instead of an extend helper.
   *
   * Only used for `classic` {@link runtime}.
   *
   * @default false
   */
  useBuiltIns?: boolean
  /**
   * When spreading props, use inline object with spread elements directly
   * instead of an extend helper or Object.assign.
   *
   * Only used for `classic` {@link runtime}.
   *
   * @default false
   */
  useSpread?: boolean
  /**
   * Enable React Fast Refresh .
   *
   * Conforms to the implementation in {@link https://github.com/facebook/react/tree/main/packages/react-refresh}
   *
   * @default false
   */
  refresh?: boolean | ReactRefreshOptions
}

export interface PreRenderedChunk {
  name: string
  isEntry: boolean
  isDynamicEntry: boolean
  facadeModuleId?: string
  moduleIds: Array<string>
  exports: Array<string>
}

export interface ReactRefreshOptions {
  /**
   * Specify the identifier of the refresh registration variable.
   *
   * @default `$RefreshReg$`.
   */
  refreshReg?: string
  /**
   * Specify the identifier of the refresh signature variable.
   *
   * @default `$RefreshSig$`.
   */
  refreshSig?: string
  emitFullSignatures?: boolean
}

export declare function registerPlugins(id: number, plugins: Array<BindingPluginWithIndex>): void

export interface RenderedChunk {
  name: string
  isEntry: boolean
  isDynamicEntry: boolean
  facadeModuleId?: string
  moduleIds: Array<string>
  exports: Array<string>
  fileName: string
  modules: Record<string, BindingRenderedModule>
  imports: Array<string>
  dynamicImports: Array<string>
}

export interface SourceMap {
  file?: string
  mappings: string
  names: Array<string>
  sourceRoot?: string
  sources: Array<string>
  sourcesContent?: Array<string>
  version: number
  x_google_ignoreList?: Array<number>
}

/**
 * Transpile a JavaScript or TypeScript into a target ECMAScript version.
 *
 * @param filename The name of the file being transformed. If this is a
 * relative path, consider setting the {@link TransformOptions#cwd} option..
 * @param sourceText the source code itself
 * @param options The options for the transformation. See {@link
 * TransformOptions} for more information.
 *
 * @returns an object containing the transformed code, source maps, and any
 * errors that occurred during parsing or transformation.
 */
export declare function transform(filename: string, sourceText: string, options?: TransformOptions | undefined | null): TransformResult

/**
 * Options for transforming a JavaScript or TypeScript file.
 *
 * @see {@link transform}
 */
export interface TransformOptions {
  sourceType?: 'script' | 'module' | 'unambiguous' | undefined
  /** Treat the source text as `js`, `jsx`, `ts`, or `tsx`. */
  lang?: 'js' | 'jsx' | 'ts' | 'tsx'
  /**
   * The current working directory. Used to resolve relative paths in other
   * options.
   */
  cwd?: string
  /**
   * Enable source map generation.
   *
   * When `true`, the `sourceMap` field of transform result objects will be populated.
   *
   * @default false
   *
   * @see {@link SourceMap}
   */
  sourcemap?: boolean
  /** Configure how TypeScript is transformed. */
  typescript?: TypeScriptOptions
  /** Configure how TSX and JSX are transformed. */
  jsx?: JsxOptions
  /** Enable ES2015 transformations. */
  es2015?: Es2015Options
  /** Define Plugin */
  define?: Record<string, string>
  /** Inject Plugin */
  inject?: Record<string, string | [string, string]>
}

export interface TransformResult {
  /**
   * The transformed code.
   *
   * If parsing failed, this will be an empty string.
   */
  code: string
  /**
   * The source map for the transformed code.
   *
   * This will be set if {@link TransformOptions#sourcemap} is `true`.
   */
  map?: SourceMap
  /**
   * The `.d.ts` declaration file for the transformed code. Declarations are
   * only generated if `declaration` is set to `true` and a TypeScript file
   * is provided.
   *
   * If parsing failed and `declaration` is set, this will be an empty string.
   *
   * @see {@link TypeScriptOptions#declaration}
   * @see [declaration tsconfig option](https://www.typescriptlang.org/tsconfig/#declaration)
   */
  declaration?: string
  /**
   * Declaration source map. Only generated if both
   * {@link TypeScriptOptions#declaration declaration} and
   * {@link TransformOptions#sourcemap sourcemap} are set to `true`.
   */
  declarationMap?: SourceMap
  /**
   * Parse and transformation errors.
   *
   * Oxc's parser recovers from common syntax errors, meaning that
   * transformed code may still be available even if there are errors in this
   * list.
   */
  errors: Array<string>
}

export interface TypeScriptOptions {
  jsxPragma?: string
  jsxPragmaFrag?: string
  onlyRemoveTypeImports?: boolean
  allowNamespaces?: boolean
  allowDeclareFields?: boolean
  /**
   * Also generate a `.d.ts` declaration file for TypeScript files.
   *
   * The source file must be compliant with all
   * [`isolatedDeclarations`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#isolated-declarations)
   * requirements.
   *
   * @default false
   */
  declaration?: IsolatedDeclarationsOptions
  /**
   * Rewrite or remove TypeScript import/export declaration extensions.
   *
   * - When set to `rewrite`, it will change `.ts`, `.mts`, `.cts` extensions to `.js`, `.mjs`, `.cjs` respectively.
   * - When set to `remove`, it will remove `.ts`/`.mts`/`.cts`/`.tsx` extension entirely.
   * - When set to `true`, it's equivalent to `rewrite`.
   * - When set to `false` or omitted, no changes will be made to the extensions.
   *
   * @default false
   */
  rewriteImportExtensions?: 'rewrite' | 'remove' | boolean
}
