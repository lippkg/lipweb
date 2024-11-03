declare module "remark-link-rewrite" {
  export default function RemarkLinkRewrite(options?: {
    replacer: (url: string) => string;
  });
}
