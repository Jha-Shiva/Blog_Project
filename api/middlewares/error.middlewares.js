const errorHandler = (err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Something Went Wrong',
    });
};

export default errorHandler;