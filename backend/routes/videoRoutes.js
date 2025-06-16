const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const videoController = require('../controllers/videoController');

router.get('/', videoController.getAllVideos);
router.post('/', upload.single('file'), videoController.createVideo);
//router.put('/:id', videoController.updateVideo);
//router.delete('/:id', videoController.deleteVideo);

module.exports = router;
