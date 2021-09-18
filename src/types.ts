import { ReactNode } from 'react';

export interface SliderValidateType {
  /**
   * canvas宽度
   * @default 320
   */
  width?: number;
  /**
   * canvas高度
   * @default 160
   */
  height?: number;
  /**
   * 滑块的半径
   * @default 42
   */
  sliderLength?: number;
  /**
   * 滑块的半径
   * @default 9
   */
  sliderRadius?: number;
  /**
   * 背景图片地址
   */
  backgroundUrl?: string;
  /**
   * 是否可见
   * @default false
   */
  visible?: boolean;
  /**
   * 滑块文本
   * @default ''
   */
  text?: string;
  /**
   * 刷新按钮图标
   */
  refreshIcon?: string | ReactNode
  /**
   * 刷新时回调
   */
  onRefresh?: () => void;
  /**
   * 验证成功回调
   */
  onSuccess?: () => void;
  /**
   * 验证失败回调
   */
  onFail?: () => void;
}