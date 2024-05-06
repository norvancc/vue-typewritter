/// <reference types="vite/client" />
/// <reference types="vue/jsx-runtime" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_REQUEST_PREFIX: string;
  readonly VITE_LABEL_STDUIO_URL: string;
  /** oss 存储地域 */
  readonly OSS_REGION: string;
  /** oss 存储密钥 key */
  readonly OSS_ACCESS_KEY_ID: string;
  /** oss 存储密钥 */
  readonly OSS_ACCESS_KEY_SECRET: string;
  /** oss 存储桶名称 */
  readonly BUCKET: string;
}

 
export {};
