let success = (data, message) => {
    return {
        code: 200,
        success: true,
        data: data,
        message: message
    }
};

let fail = (message = '服务器错误') => {
    return {
        code: 500,
        success: false,
        data: null,
        message: message
    }
};

let warn = (message = '信息有误') => {
    return {
        code: 400,
        success: false,
        data: null,
        message: message
    }
};

module.exports = {
    success,
    fail,
    warn
};