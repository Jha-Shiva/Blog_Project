const errorHandler = (err, req, res, next)=>{
    console.log(err);
    res.status(500).json({
        success: false,
        message: 'Something Went Wrong',
    });
};

export default errorHandler;