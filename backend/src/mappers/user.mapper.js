export const toUserResponse = (user) => {
    return {
        id: user.user_id || user.id || user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
    };
};

