import Konva from 'konva';

export default function buildDraggableGraph(width, height) {

  let stage = new Konva.Stage({
    container: '#draggable-container',
    width: width,
    height: height
  });

  let draggablePadding = width / 6;
  let graphPadding = 40;

// globals
  let curveLayer, anchorLayer, quad, rect;

  rect = new Konva.Rect({
    width: width,
    height: height,
    stroke: "#343434",
    strokeWidth: 5
  });

  function buildAnchor(x, y, radius) {
    let anchor = new Konva.Circle({
      x: x,
      y: y,
      radius: radius,
      stroke: '#179543',
      fill: '#1db954',
      strokeWidth: 4,
      draggable: true,
      dragBoundFunc: function (pos) {
        let newX;

        if (pos.x <= draggablePadding) {
          newX = draggablePadding;
        } else if (pos.x >= width - draggablePadding) {
          newX = width - draggablePadding;
        } else {
          newX = pos.x;
        }

        // update X coordinate of other bezier points
        quad.bezierPoint1.x(newX);
        quad.bezierPoint2.x(newX);

        // measure, how far the control is moved to the right so we can calculate the appropriate Y coordinates for the bezier points
        let fraction = newX / width;
        quad.bezierPoint1.y((height * fraction) - graphPadding);
        quad.bezierPoint2.y(height - (height * fraction) - graphPadding);

        drawCurve();

        return {
          x: newX,
          y: this.getAbsolutePosition().y
        }
      }
    });

    // add hover styling
    anchor.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
      this.setStrokeWidth(6);
      anchorLayer.draw();
    });
    anchor.on('mouseout', function () {
      document.body.style.cursor = 'default';
      this.setStrokeWidth(4);
      anchorLayer.draw();

    });

    anchor.on('dragend', function () {
      drawCurve();
    });

    anchorLayer.add(anchor);
    return anchor;
  }

  function buildPoint(x, y) {
    let circle = new Konva.Circle({
      x: x,
      y: y,
      radius: 5,
      fill: '#000000',
    });

    anchorLayer.add(circle);
    return circle;
  }

  function drawCurve() {
    let context = curveLayer.getContext();

    context.clear();
    // draw bezier
    context.beginPath();
    context.moveTo(quad.start.attrs.x, quad.start.attrs.y);
    context.bezierCurveTo(quad.bezierPoint1.attrs.x, quad.bezierPoint1.attrs.y,
      quad.bezierPoint2.attrs.x, quad.bezierPoint2.attrs.y,
      quad.end.attrs.x, quad.end.attrs.y,);
    context.setAttr('strokeStyle', '#343434');
    context.setAttr('lineWidth', 4);
    context.setAttr('fillStyle', '#343434');
    context.closePath();
    context.stroke();
    context.fill();

    stage.container().click();
  }

  anchorLayer = new Konva.Layer();

// curveLayer just contains a canvas which is drawn
// onto with the existing canvas API
  curveLayer = new Konva.Layer();

  anchorLayer.add(rect);

  let fraction = draggablePadding / width;

  quad = {
    start: buildPoint(0, height),
    bezierPoint1: buildPoint(draggablePadding, (height * fraction) - graphPadding),
    control: buildAnchor(draggablePadding, 115, 14),
    bezierPoint2: buildPoint(draggablePadding, height - (height * fraction) - graphPadding),
    end: buildPoint(width, height)
  };


// keep curves insync with the lines
  anchorLayer.on('beforeDraw', function () {
    drawCurve();
  });

  stage.add(curveLayer);
  stage.add(anchorLayer);
  drawCurve();

  return quad.control;
}
