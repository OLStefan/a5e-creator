import { extractStyle } from '@ant-design/static-style-extract';
import { ConfigProvider } from 'antd';
import fs from 'fs';
import { createElement } from 'react';
import { themeConfig } from '../theme';

const outputPath = './src/scripts/antd.min.css';

const css = extractStyle((node) => createElement(ConfigProvider, { theme: themeConfig }, node));

fs.writeFileSync(outputPath, css);
