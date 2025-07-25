import Company from '../models/company.model.js';
// export const registerCompany = async (req, res) => {
    // try {
    //     const{companyName}= req.body;
    //     if(!companyName){
    //         return res.status(400).json({ message: 'Company name is required', success: false });
    //     }
    //     // Check if company already exists
    //     let company= await Company.findOne({ name: companyName });
    //     if(company){
    //         return res.status(400).json({ message: 'Company already exists', success: false });
    //     }
    //     // Create new company
    //     company = await Company.create({
    //         name: companyName,
    //         userId: req.id,

    //        // Assuming you're using multer for file uploads
    //     });
    //     return res.status(201).json({ message: 'Company registered successfully', company, success: true });
        
    // } catch (error) {
    //     console.error('Error during company registration:', error);
    //     return res.status(500).json({ message: 'Internal server error', success: false });
        
    // }}
    export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;

        // Check for required fields
        if (!companyName || !description) {
            return res.status(400).json({ message: 'Company name and description are required', success: false });
        }

        // Check if company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ message: 'Company already exists', success: false });
        }

        // Create new company
        company = await Company.create({
            name: companyName,
            description,
            website,
            location,
            userId: req.id
        });

        return res.status(201).json({ message: 'Company registered successfully', company, success: true });

    } catch (error) {
        console.error('Error during company registration:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

    export const getCompany= async (req, res) => {
        try {
            const userId = req.id;
            const companies = await Company.find({ userId });
            if (!companies || companies.length === 0) {
                return res.status(404).json({ message: 'No companies found', success: false });
            }
            return res.status(200).json({ message: 'Companies fetched successfully', companies, success: true });
            
        } catch (error) {
            console.log('Error fetching company:', error);
            
            
        }}
        //get company by id
        export const getCompanyById = async (req, res) => {
            try {
                const companyId = req.params.id;
                const company = await Company.findById(companyId);
                if (!company) {
                    return res.status(404).json({ message: 'Company not found', success: false });
                }
                return res.status(200).json({ message: 'Company fetched successfully', company, success: true });


                
            } catch (error) {
                console.log(error);
                
                
            }}
            // Update company details
            export const updateCompany = async (req, res) => {
                try {
                    const{name,description,website,location}= req.body;
                    const file= req.file; // Assuming you're using multer for file uploads
                    //cloudainary upload logic here

                  const updatedData = {name,description,website,location};
                  const company= await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true });
                    if (!company) {
                        return res.status(404).json({ message: 'Company not found', success: false });
                    }
                    return res.status(200).json({ message: 'Company updated successfully', company, success: true });


                    
                } catch (error) {
                    log.error('Error updating company:', error);
                    
                }}