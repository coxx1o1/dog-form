import Dog from '../models/dog.js';

// @desc    Get all dogs
// @route   GET /api/dogs
// @access  Public
export const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single dog
// @route   GET /api/dogs/:id
// @access  Public
export const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a dog
// @route   POST /api/dogs
// @access  Public
export const createDog = async (req, res) => {
  const { name, breed, age, status } = req.body;

  if (!name || !breed || !age) {
    return res.status(400).json({ message: 'Please enter all required fields: name, breed, age' });
  }

  try {
    const newDog = await Dog.create({
      name,
      breed,
      age,
      status
    });
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a dog
// @route   PUT /api/dogs/:id
// @access  Public
export const updateDog = async (req, res) => {
  try {
    const { name, breed, age, status } = req.body;
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    dog.name = name || dog.name;
    dog.breed = breed || dog.breed;
    dog.age = age || dog.age;
    dog.status = status || dog.status;

    const updatedDog = await dog.save();
    res.status(200).json(updatedDog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a dog
// @route   DELETE /api/dogs/:id
// @access  Public
export const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    await Dog.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Dog removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};