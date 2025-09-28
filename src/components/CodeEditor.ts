export type CodeEditorProps = {
  code: string;
  theme: 'light' | 'dark';
  onChange: (val: string) => void;
}