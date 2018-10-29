document.addEventListener("DOMContentLoaded", function() {
    const canvasEl = document.getElementById('root');
    canvasEl.width = 500;
    canvasEl.height = 500; 
    const ctx = canvasEl.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,500, 500);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = 'blue';
    ctx.fill();
})