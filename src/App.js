import './App.css';
import React, { useRef, useEffect } from 'react';

function App() {
  const WSH = 'WALL-SKINNY-HORIZONTAL'
  const WSV = 'WALL-SKINNY-VERTICAL'

  const WSTL = 'WALL-SKINNY-TOP-LEFT'
  const WSTR = 'WALL-SKINNY-TOP-RIGHT'
  const WSBL = 'WALL-SKINNY-BOT-LEFT'
  const WSBR = 'WALL-SKINNY-BOT-RIGHT'

  const WFTL = 'WALL-FAT-TOP-LEFT'
  const WFTR = 'WALL-FAT-TOP-RIGHT'
  const WFBL = 'WALL-FAT-BOT-LEFT'
  const WFBR = 'WALL-FAT-BOT-RIGHT'

  const WSTLI = 'WALL-SKINNY-TOP-LEFT-INVERTED'
  const WSTRI = 'WALL-SKINNY-TOP-RIGHT-INVERTED'
  const WSBLI = 'WALL-SKINNY-BOT-LEFT-INVERTED'
  const WSBRI = 'WALL-SKINNY-BOT-RIGHT-INVERTED'

  const WFTLI = 'WALL-FAT-TOP-LEFT-INVERTED'
  const WFTRI = 'WALL-FAT-TOP-RIGHT-INVERTED'
  const WFBLI = 'WALL-FAT-BOT-LEFT-INVERTED'
  const WFBRI = 'WALL-FAT-BOT-RIGHT-INVERTED'

  const WFT = 'WALL-FAT-TOP'
  const WFB = 'WALL-FAT-BOT'
  const WFL = 'WALL-FAT-LEFT'
  const WFR = 'WALL-FAT-RIGHT'
  const WFF = 'WALL-FAT-FILLED'

  const FD = 'FOOD'
  const DR = 'DOOR' // to the ghost pen
  const EM = 'EMPTY'
  const VT = 'VITAMIN'

  let board = [
    [WSTL, WSH, WSH, WSH, WSH, WSH, WSH, WSH, WSH, WSH, WSBLI, WSBRI, WSH, WSH, WSH, WSH, WSBLI, WSBRI, WSH, WSH, WSH, WSH, WSH, WSH, WSH, WSH, WSH, WSTR],
    [WSV, FD, FD, FD, FD, FD, FD, FD, FD, FD, WFL, WFR, FD, FD, FD, FD, WFL, WFR, FD, FD, FD, FD, FD, FD, FD, FD, FD, WSV],
    [WSV, FD, WFTL, WFT, WFT, WFTR, FD, WFTL, WFTR, FD, WFL, WFR, FD, WFTL, WFTR, FD, WFL, WFR, FD, WFTL, WFTR, FD, WFTL, WFT, WFT, WFTR, FD, WSV],
    [WSV, FD, WFBL, WFB, WFB, WFBR, FD, WFL, WFR, FD, WFBL, WFBR, FD, WFL, WFR, FD, WFBL, WFBR, FD, WFL, WFR, FD, WFBL, WFB, WFB, WFBR, FD, WSV ],
    [WSV, FD, FD, FD, FD, VT, FD, WFL, WFR, FD, FD, FD, FD, WFL, WFR, FD, FD, FD, FD, WFL, WFR, FD, VT, FD, FD, FD, FD, WSV],
    [WSV, FD, WFTL, WFT, WFT, WFTR, FD, WFL, WFBLI, WFT, WFT, WFTR, FD, WFL, WFR, FD, WFTL, WFT, WFT, WFBRI, WFR, FD, WFTL, WFT, WFT, WFTR, FD, WSV],
    [WSV, FD, WFL, WFTLI, WFB, WFBR, FD, WFBL, WFB, WFB, WFB, WFBR, FD, WFL, WFR, FD, WFBL, WFB, WFB, WFB, WFBR, FD, WFBL, WFB, WFTRI, WFR, FD, WSV],
    [WSV, FD, WFL, WFR, FD, FD, FD, FD, FD, FD, FD, FD, FD, WFL, WFR, FD, FD, FD, FD, FD, FD, FD, FD, FD, WFL, WFR, FD, WSV],
    [WSV, FD, WFL, WFR, FD, WFTL, WFT, WFT, WFTR, EM, WFTL, WFT, WFT, WFBRI, WFBLI, WFT, WFT, WFTR, EM, WFTL, WFT, WFT, WFTR, FD, WFL, WFR, FD, WSV],
    [WSV, FD, WFBL, WFBR, FD, WFBL, WFB, WFB, WFBR, EM, WFBL, WFB, WFB, WFB, WFB, WFB, WFB, WFBR, EM, WFBL, WFB, WFB, WFBR, FD, WFBL, WFBR, FD, WSV],
    [EM, FD, FD, FD, FD, FD, EM, EM, EM, EM, EM, EM, EM, EM, EM, EM, EM, EM, EM, EM, EM, FD, FD, FD, FD, FD, FD, EM],
    [WSV, FD, WFTL, WFT, WFT, WFTR, FD, WFTL, WFTR, EM, WSTL, WSH, WSH, EM, EM, WSH, WSH, WSTR, EM, WFTL, WFTR, FD, WFTL, WFT, WFT, WFTR, FD, WSV],
    [WSV, FD, WFL, WFF, WFF, WFR, FD, WFL, WFR, EM, WSV, EM, EM, EM, EM, EM, EM, WSV, EM, WFL, WFR, FD, WFBL, WFB, WFB, WFBR, FD, WSV],
  ];

  const width = 300;
  const height = 300;
  const cellWidth = width/28;
  const cellHeight = height/31;

  function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
  }

  function ghost(ctx, x, y, color) {
    ctx.beginPath();
    // 83, 116,
    ctx.moveTo(x-15, y+15);
    ctx.lineTo(x, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 6.3);
    ctx.stroke();
  }

  const renderWSTL = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.bezierCurveTo(
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth,
      y*cellHeight + cellHeight/2
    )
    ctx.stroke();
  }

  const renderWFTL= (ctx, x, y) => {
    ctx.beginPath();
    ctx.bezierCurveTo(
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth,
      y*cellHeight + cellHeight/2
    )
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight + cellHeight)
    ctx.stroke()
    ctx.fill()
  }

  const renderWFTR = (ctx, x, y) => {
    ctx.beginPath();
    ctx.bezierCurveTo(
      x*cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight
    )
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.stroke()
    ctx.fill()
  }

  const renderWFBL= (ctx, x, y) => {
    ctx.beginPath();
    ctx.bezierCurveTo(
      x*cellWidth + cellWidth/2,
      y*cellHeight,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth,
      y*cellHeight + cellHeight/2
    )
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight)
    ctx.stroke()
    ctx.fill()
  }

  const renderWFBR= (ctx, x, y) => {
    ctx.beginPath();
    ctx.bezierCurveTo(
      x*cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight
    )
    ctx.lineTo(x*cellWidth, y*cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.stroke()
    ctx.fill()
  }

  const renderWSH = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.moveTo(x, y);
    ctx.moveTo(x*cellWidth, y*cellHeight + cellHeight/2);
    // ctx.lineTo(x, y);
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight/2);
    ctx.stroke();
  }

  const renderWSTR = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.bezierCurveTo(
      x*cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight
    )
    ctx.stroke();
  }

  const renderWSV = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.moveTo(x, y);
    ctx.moveTo(x*cellWidth + cellWidth/2, y*cellHeight);
    // ctx.lineTo(x, y);
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight + cellHeight);
    ctx.stroke();
  }

  const renderFD = (ctx, x, y) => {
    // x, y, w, h
    ctx.beginPath();
    ctx.rect(x*cellWidth + cellWidth/4, y*cellHeight + cellHeight/4, cellWidth/2,  cellHeight/2);
    ctx.fill();
  }

  const renderWSBL = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.bezierCurveTo(
      x*cellWidth + cellWidth/2,
      y*cellHeight,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth,
      y*cellHeight + cellHeight/2
    )
    ctx.stroke();
  }

  const renderWSBR = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.bezierCurveTo(
      x*cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight
    )
    ctx.stroke();
  }

  const renderWFTRI = (ctx, x, y) => {
    ctx.beginPath();
    ctx.bezierCurveTo(
      x*cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight
    )
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2);
    ctx.fill()
    ctx.stroke()
  }

  const renderWFTLI = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.bezierCurveTo(
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth,
      y*cellHeight + cellHeight/2
    )
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight + cellHeight)
    ctx.fill();
    ctx.stroke()
  }

  const renderEM = (ctx, x, y) => {
    // noop
  }

  const renderWSBLI = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.bezierCurveTo(
      x*cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight
    )
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight/2)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.stroke();
    ctx.fill();
  }

  const renderWSBRI = (ctx, x, y) => {
    ctx.beginPath();
    // ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    ctx.bezierCurveTo(
      x*cellWidth + cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight
    )
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight/2)
    ctx.stroke();
    ctx.fill();
  }

  const renderWFL = (ctx, x, y) => {
    ctx.beginPath();
    ctx.moveTo(x*cellWidth + cellWidth/2, y*cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight)
    ctx.stroke();
    ctx.fill();
  }

  const renderWFR = (ctx, x, y) => {
    ctx.beginPath();
    ctx.moveTo(x*cellWidth + cellWidth/2, y*cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight)
    ctx.stroke();
    ctx.fill();
  }

  const renderWFT = (ctx, x, y) => {
    ctx.beginPath();
    ctx.moveTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight/2);
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.stroke();
    ctx.fill();
  }

  const renderWFB = (ctx, x, y) => {
    ctx.beginPath();
    ctx.moveTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight/2);
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight);
    ctx.lineTo(x*cellWidth, y*cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.stroke();
    ctx.fill();
  }

  const renderWFF = (ctx, x, y) => {
    ctx.beginPath();
    ctx.rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight)
    ctx.fill();
  }

  const renderWFBLI = (ctx, x, y) => {
    ctx.beginPath()
    ctx.bezierCurveTo(
      x*cellWidth + cellWidth/2,
      y*cellHeight,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth,
      y*cellHeight + cellHeight/2
    )
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth/2, y*cellHeight)
    ctx.stroke()
    ctx.fill()
  }

  const renderWFBRI = (ctx, x, y) => {
    ctx.beginPath()
    ctx.bezierCurveTo(
      x*cellWidth,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      x*cellWidth + cellWidth/2,
      y*cellHeight
    )
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight)
    ctx.lineTo(x*cellWidth + cellWidth, y*cellHeight + cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight)
    ctx.lineTo(x*cellWidth, y*cellHeight + cellHeight/2)
    ctx.stroke()
    ctx.fill()
  }

  const renderVT = (ctx, x, y) => {
    ctx.beginPath()
    ctx.arc(
      x*cellWidth + cellWidth/2,
      y*cellHeight + cellHeight/2,
      cellWidth/3,
      0,
      2*Math.PI
    )
    ctx.stroke()
    ctx.fill()
  }

  const renderBoard = (ctx) => {
    board.forEach((row, y) => {
      row.forEach((img, x) => {
        switch (img) {
          case WSTL:
            renderWSTL(ctx, x, y)
            break;
          case WSH:
            renderWSH(ctx, x, y)
            break;
          case WSTR:
            renderWSTR(ctx, x, y)
            break;
          case WSV:
            renderWSV(ctx, x, y)
            break;
          case FD:
            renderFD(ctx, x, y)
            break;
          case WSBL:
            renderWSBL(ctx, x, y)
            break;
          case WSBR:
            renderWSBR(ctx, x, y)
            break;
          case WFTRI:
            renderWFTRI(ctx, x, y)
            break;
          case WFTLI:
            renderWFTLI(ctx, x, y)
            break;
          case WSBLI:
            renderWSBLI(ctx, x, y)
            break;
          case WSBRI:
            renderWSBRI(ctx, x, y)
            break;
          case WFL:
            renderWFL(ctx, x, y)
            break;
          case WFR:
            renderWFR(ctx, x, y)
            break
          case WFT:
            renderWFT(ctx, x, y)
            break
          case WFB:
            renderWFB(ctx, x, y)
            break
          case WFF:
            renderWFF(ctx, x, y)
            break
          case WFTL:
            renderWFTL(ctx, x, y)
            break
          case WFBL:
            renderWFBL(ctx, x, y)
            break
          case WFBR:
            renderWFBR(ctx, x, y)
            break
          case WFTR:
            renderWFTR(ctx, x, y)
            break
          case VT:
            renderVT(ctx, x, y)
            break
          case WFBLI:
            renderWFBLI(ctx, x, y)
            break
          case WFBRI:
            renderWFBRI(ctx, x, y)
            break
          case EM:
            renderEM(ctx, x, y)
            break
          default:
            console.log('lol', img)
        }
      })
    })
  }

  const Canvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#6a0dad';
      renderBoard(ctx, width, height);
    }, []);

    return <canvas ref={canvasRef} width={width} height={height} style={{width: `${width}px`, height: `${height}px`, border: 'solid purple 5px', background: 'violet'}}></canvas>
  }

  return (
    <div className="App">
      <h1>Playing with canvas</h1>
      <Canvas />
    </div>
  );
}

export default App;
