import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['portal/**', 'cdk.out/**', '.yarn/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
