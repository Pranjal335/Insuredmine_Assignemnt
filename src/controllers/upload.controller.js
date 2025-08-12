const path = require('path');
const { Worker } = require('worker_threads');

exports.uploadFileController = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.resolve(req.file.path);

    
    const worker = new Worker(path.join(__dirname, '../workers/uploadWorker.js'), {
        workerData: { filePath }
    });

    worker.on('message', (message) => {
        console.log('Worker message:', message);
    });

    worker.on('error', (err) => {
        console.error('Worker error:', err);
    });

    worker.on('exit', (code) => {
        console.log(`Worker exited with code ${code}`);
    });

    res.json({ message: 'File received and processing started in background' });
};
