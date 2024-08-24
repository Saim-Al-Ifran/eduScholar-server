
const CustomError = require('../../errors/CustomError');
const Application = require('../../models/Application');
const Scholarship = require('../../models/Scholarship');

 

const getAllApplications = async (_req, res, next) => {
    try {
        const applications = await Application.aggregate([
            {
                $lookup: {
                    from: 'scholarships',
                    localField: 'scholarship',
                    foreignField: '_id',
                    as: 'scholarshipDetails'
                }
            },
            {
                $unwind: '$scholarshipDetails'
            },
            {
                $lookup: {
                    from: 'scholarshipcategories',
                    localField: 'scholarshipDetails.scholarshipCategory',
                    foreignField: '_id',
                    as: 'scholarshipDetails.scholarshipCategory'
                }
            },
            {
                $unwind: '$scholarshipDetails.scholarshipCategory'
            },
            {
                $lookup: {
                    from: 'degrees',
                    localField: 'scholarshipDetails.degree',
                    foreignField: '_id',
                    as: 'scholarshipDetails.degree'
                }
            },
            {
                $unwind: '$scholarshipDetails.degree'
            },
            {
                $lookup: {
                    from: 'subjectcategories',
                    localField: 'scholarshipDetails.subjectCategory',
                    foreignField: '_id',
                    as: 'scholarshipDetails.subjectCategory'
                }
            },
            {
                $unwind: '$scholarshipDetails.subjectCategory'
            },
            {
                $project: {
                    _id: 1,
                    userEmail: 1,
                    scholarship: {
                        _id: '$scholarshipDetails._id',
                        universityName: '$scholarshipDetails.universityName',
                        image: '$scholarshipDetails.image',
                        scholarshipCategory: '$scholarshipDetails.scholarshipCategory._id',
                        degree: '$scholarshipDetails.degree._id',
                        location: '$scholarshipDetails.location',
                        applicationDeadline: '$scholarshipDetails.applicationDeadline',
                        subjectCategory: '$scholarshipDetails.subjectCategory._id',
                        fees: '$scholarshipDetails.fees',
                        stipend: '$scholarshipDetails.stipend',
                        serviceCharge: '$scholarshipDetails.serviceCharge',
                        worldRank: '$scholarshipDetails.worldRank',
                        rating: '$scholarshipDetails.rating',
                        description: '$scholarshipDetails.description',
                        createdAt: '$scholarshipDetails.createdAt'
                    },
                    personalDetails: 1,
                    academicDetails: 1,
                    status: 1,
                    feedback: 1,
                    createdAt: 1
                }
            },
            {
                $lookup: {
                    from: 'scholarshipcategories',
                    localField: 'scholarship.scholarshipCategory',
                    foreignField: '_id',
                    as: 'scholarship.scholarshipCategoryDetails'
                }
            },
            {
                $unwind: '$scholarship.scholarshipCategoryDetails'
            },
            {
                $lookup: {
                    from: 'degrees',
                    localField: 'scholarship.degree',
                    foreignField: '_id',
                    as: 'scholarship.degreeDetails'
                }
            },
            {
                $unwind: '$scholarship.degreeDetails'
            },
            {
                $lookup: {
                    from: 'subjectcategories',
                    localField: 'scholarship.subjectCategory',
                    foreignField: '_id',
                    as: 'scholarship.subjectCategoryDetails'
                }
            },
            {
                $unwind: '$scholarship.subjectCategoryDetails'
            },
            {
                $project: {
                    _id: 1,
                    userEmail: 1,
                    scholarship: {
                        _id: 1,
                        universityName: 1,
                        image: 1,
                        scholarshipCategory: '$scholarship.scholarshipCategoryDetails.name',
                        degree: '$scholarship.degreeDetails.name',
                        location: 1,
                        applicationDeadline: 1,
                        subjectCategory: '$scholarship.subjectCategoryDetails.name',
                        fees: 1,
                        stipend: 1,
                        serviceCharge: 1,
                        worldRank: 1,
                        rating: 1,
                        description: 1,
                        createdAt: 1
                    },
                    personalDetails: 1,
                    academicDetails: 1,
                    status: 1,
                    feedback: 1,
                    createdAt: 1
                }
            }
        ]);

        return res.status(200).json(applications);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

 
const getSingleApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id).populate('scholarship');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        return res.status(200).json(application);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};


const addFeedback = async (req, res, next) => {
  try {
    const { feedback } = req.body;
    const applicationId = req.params.id;
    console.log(req.body);

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { feedback },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
   // console.log('Successfully added feedback',{feedback});
     return res.status(200).json({ message: 'Successfully added feedback', application })

  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};


const deleteApplication = async (req, res, next) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
      return res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

const cancelApplication = async (req, res, next) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true, runValidators: true }
        );
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
       return res.status(200).json(application);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};


const changeApplicationStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        
       
        const validStatuses = ['pending', 'approved', 'rejected', 'processing'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

       return res.status(200).json(application);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};


const getStudentsApplication = async (req, res, next) => {
    try {
        const applications = await Application.find({ userEmail: req.user.email })
                                              .populate('scholarship');

        return res.status(200).json({applicationCount: applications.length, applications});
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};


const studentGetApplicationById = async (req, res, next) => {
  try {
      const application = await Application.findOne({ _id: req.params.id, userEmail: req.user.email }).populate('scholarship');
      if (!application) {
          return res.status(404).json({ message: 'Application not found' });
      }
      return res.status(200).json(application);
  } catch (err) {
      next(new CustomError(err.message, 500));
  }
};

const studentDeleteApplication = async (req, res, next) => {
  try {
      const application = await Application.findOneAndDelete({ _id: req.params.id, userEmail: req.user.email, status: 'pending' });
      if (!application) {
          return res.status(404).json({ message: 'Application not found or cannot be deleted' });
      }
      return res.status(200).json({ message: 'Application cancelled successfully' });
  } catch (err) {
      next(new CustomError(err.message, 500));
  }
};
 
const studentUpdateApplication = async (req, res, next) => {
  try {
      const application = await Application.findOneAndUpdate(
          { _id: req.params.id, userEmail: req.user.email, status: 'pending' },
          req.body,
          { new: true, runValidators: true }
      );
      if (!application) {
          return res.status(404).json({ message: 'Application not found or cannot be updated' });
      }
      return res.status(200).json(application);
  } catch (err) {
      next(new CustomError(err.message, 500));
  }
  
};

const applyForScholarship = async (req, res, next) => {
    try {
        const { scholarshipId, personalDetails, academicDetails } = req.body;

        // Validate scholarship existence
        const scholarship = await Scholarship.findById(scholarshipId);
        if (!scholarship) {
            return next(new CustomError('Scholarship not found', 404));
        }
        // Create new application
        const newApplication = new Application({
            userEmail: req.user.email,
            scholarship: scholarshipId,
            personalDetails,
            academicDetails
        });

        const savedApplication = await newApplication.save();
        return res.status(201).json(savedApplication);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};



module.exports = {
    getAllApplications,
    getSingleApplication,
    addFeedback,
    deleteApplication,
    cancelApplication,
    changeApplicationStatus,
    getStudentsApplication,
    studentGetApplicationById,
    studentDeleteApplication,
    studentUpdateApplication,
    applyForScholarship
}