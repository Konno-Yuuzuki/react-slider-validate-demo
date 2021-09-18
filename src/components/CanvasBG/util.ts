export const drawSlider = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  l: number,
  r: number,
  operation: 'fill' | 'clip'
) => {
  const { PI } = Math;
  ctx.globalCompositeOperation = 'destination-over';
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#FFF';
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);

  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.26 * PI, 2.76 * PI);

  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);

  ctx.arc(x + r - 2, y + l / 2, r, 2.76 * PI, 1.26 * PI, true);
  ctx.lineTo(x, y);
  if (operation === 'fill') {
    ctx.fillStyle = '#FFFFFF80';
    ctx.fill();
  } else {
    ctx.clip();
  }
  ctx.stroke();
};