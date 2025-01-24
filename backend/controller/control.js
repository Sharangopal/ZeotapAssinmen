const Sheet = require('../models/model');

exports.createSheet = async (req, res) => {
  try {
    const newSheet = new Sheet(req.body);
    await newSheet.save();
    res.status(201).json(newSheet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sheet', error });
  }
};

exports.getSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find({ userId: req.params.userId });
    res.json(sheets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sheets', error });
  }
};

exports.updateSheet = async (req, res) => {
  try {
    const updatedSheet = await Sheet.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedSheet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sheet', error });
  }
};

exports.deleteSheet = async (req, res) => {
  try {
    await Sheet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sheet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sheet', error });
  }
};