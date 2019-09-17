import Row from './Row';
import Grid from './Grid';
import Col from './Col';
import Slider from './Slider';

import { Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');

const w = percent => (width * percent) / 100;
const h = percent => (height * percent) / 100;
const h_miss = miss => (height - miss) / 100;
const h_miss_px = miss => height - miss;
const w_miss_px = miss => width - miss;

export { Slider, Row, Grid, Col, w, h, h_miss, h_miss_px, w_miss_px }