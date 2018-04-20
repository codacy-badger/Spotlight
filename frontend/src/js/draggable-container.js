import Konva from 'konva';

export default function buildDraggableGraph(width, height) {

  var stage = new Konva.Stage({
    container: '#draggable-container',
    width: width,
    height: height
  });

  var draggablePadding = width / 6;

// globals
  var curveLayer, anchorLayer, quad;

  var curve = new Konva.Line({
    stroke: '#1db954',
    strokeWidth: 8,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5
  });

  function buildAnchor(x, y, radius) {
    var anchor = new Konva.Circle({
      x: x,
      y: y,
      radius: radius,
      stroke: '#179543',
      fill: '#1db954',
      strokeWidth: 4,
      draggable: true,
      dragBoundFunc: function(pos) {
        var newX;

        if (pos.x <= draggablePadding) {
          newX = draggablePadding;
        } else if (pos.x >= width - draggablePadding) {
          newX = width - draggablePadding;
        } else {
          newX = pos.x;
        }

        return {
          x: newX,
          y: this.getAbsolutePosition().y
        }
      }
    });

    // add hover styling
    anchor.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
      this.setStrokeWidth(6);
      anchorLayer.draw();
    });
    anchor.on('mouseout', function() {
      document.body.style.cursor = 'default';
      this.setStrokeWidth(4);
      anchorLayer.draw();

    });

    anchor.on('dragend', function() {
      drawCurve();
    });

    anchorLayer.add(anchor);
    return anchor;
  }

  function drawCurve() {
    curve.points([quad.start.attrs.x, quad.start.attrs.y,
      quad.control.attrs.x, 70,
      quad.end.attrs.x, quad.end.attrs.y]);
    curveLayer.draw();

  }

  anchorLayer = new Konva.Layer();

// curveLayer just contains a canvas which is drawn
// onto with the existing canvas API
  curveLayer = new Konva.Layer();

  curveLayer.add(curve);

  quad = {
    start: buildAnchor(5, height, 0),
    control: buildAnchor(draggablePadding, 70, 8),
    end: buildAnchor(width - 5, height, 0)
  };


// keep curves insync with the lines
  anchorLayer.on('beforeDraw', function() {
    drawCurve();
  });

  stage.add(curveLayer);
  stage.add(anchorLayer);
  drawCurve();
}
