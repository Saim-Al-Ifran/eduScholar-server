const CustomError = require("../../errors/CustomError");
const Scholarship = require("../../models/Scholarship");
const { uploadImageToCloudinary } = require("../../utils/imageUploadCloudinary");



const getAllScholarship = async (_req, res, next) => {
    try {
         const scholarships = await Scholarship.find({})
                                    .populate('scholarshipCategory')
                                    .populate('degree')
                                    .populate('subjectCategory');
       

        if(scholarships.length === 0){
             return next(new CustomError('no scholarship found!!',404))
        }
        res.status(200).json({success:true,data:scholarships});
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const getSingleScholarship = async (req, res, next) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id)
                                             .populate('scholarshipCategory')
                                             .populate('degree')
                                             .populate('subjectCategory');
        if (!scholarship) {
            return next(new CustomError('Scholarship not found', 404));
        }
        res.status(200).json(scholarship);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const updateScholarship = async (req, res, next) => {
    try {
        const scholarshipId = req.params.id;
        const requestBody = Object.assign({}, req.body);
        console.log(requestBody);
        let updatedFields = { ...requestBody };
   
        if (req.file) {
            const cloudinaryResult = await uploadImageToCloudinary(req.file);
            updatedFields.image = cloudinaryResult.secure_url;
        }

        const updatedScholarship = await Scholarship.findByIdAndUpdate(
            scholarshipId,
            updatedFields,
            { new: true}
        );

        if (!updatedScholarship) {
            return  next(new CustomError('Scholarship not found',404))
        }

        res.status(200).json(updatedScholarship);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};


const addScholarship = async (req, res, next) => {
    try {
        const requestBody = Object.assign({}, req.body);

        const cloudinaryResult = await uploadImageToCloudinary(req.file);
        const newScholarship = new Scholarship({
            ...requestBody,
            image: cloudinaryResult.secure_url
        });

        const savedScholarship = await newScholarship.save();
        res.status(201).json(savedScholarship);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const deleteScholarship = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedScholarship = await Scholarship.findByIdAndDelete(id);
        if (!deletedScholarship) {
            return next(new CustomError('Scholarship not found', 404));
        }
        res.status(200).json({ message: 'Scholarship deleted' });
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};


// const getAllScholarships = async (req, res, next) => {
//     try {
//         const { page = 1, limit = 10, search = '', ...filters } = req.query;

//         // Build search query
//         const searchQuery = {
//             $or: [
//                 { universityName: { $regex: search, $options: 'i' } },
//                 { location: { $regex: search, $options: 'i' } },
//                 { description: { $regex: search, $options: 'i' } }
//             ]
//         };

//         // Merge search query with filters
//         const query = { ...filters, ...searchQuery };

//         const scholarships = await Scholarship.find(query)
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit))
//             .populate('scholarshipCategory degree subjectCategory');

//         const totalScholarships = await Scholarship.countDocuments(query);

//         res.status(200).json({
//             total: totalScholarships,
//             page: parseInt(page),
//             totalPages: Math.ceil(totalScholarships / limit),
//             scholarships
//         });
//     } catch (err) {
//         next(new CustomError(err.message, 500));
//     }
// };

// // Fetch a single scholarship by ID
// const getScholarshipById = async (req, res, next) => {
//     try {
//         const scholarship = await Scholarship.findById(req.params.id)
//             .populate('scholarshipCategory degree subjectCategory');

//         if (!scholarship) {
//             return next(new CustomError('Scholarship not found', 404));
//         }

//         res.status(200).json(scholarship);
//     } catch (err) {
//         next(new CustomError(err.message, 500));
//     }
// };


module.exports = {
    getSingleScholarship,
    getAllScholarship,
    updateScholarship,
    addScholarship,
    deleteScholarship
};
