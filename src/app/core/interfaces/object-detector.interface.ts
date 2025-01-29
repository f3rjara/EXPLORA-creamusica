export interface ObjectDetector {
  id?: string;
  index?: number;
  name: string;
  confidence: number;
  x: number ;
  y: number  ;
  width: number ;
  height: number ;
}
