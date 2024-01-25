import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const figmaWidth = 360;
const figmaHeight = 779;

function scale(size: number): number {
  return width * 2 < height
    ? (height / width / 1.2) * size
    : (height / width) * size;
}

function scaleWidthDP(size: number) {
  return PixelRatio.roundToNearestPixel((size * width) / figmaWidth);
}

function scaleHeightDP(size: number) {
  return PixelRatio.roundToNearestPixel((size * height) / figmaHeight);
}

export {scale, width, height, scaleWidthDP, scaleHeightDP};
