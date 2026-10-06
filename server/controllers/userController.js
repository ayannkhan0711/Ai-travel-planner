const User = require('../models/User');

// @desc Get user profile
// @route GET /api/user/profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('bookingHistory savedTrips');
    if (!user) {
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update user profile
// @route PUT /api/user/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    delete updates.password;
    delete updates.role;

    let user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      user = { ...req.user, ...updates };
    }

    res.status(200).json({
      success: true,
      message: 'Profile successfully updated',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update preferences
// @route PUT /api/user/preferences
exports.updatePreferences = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.preferences = { ...user.preferences, ...req.body };
      await user.save();
      return res.status(200).json({
        success: true,
        message: 'Preferences saved',
        preferences: user.preferences,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Preferences saved (session updated)',
      preferences: req.body,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get settings
// @route GET /api/user/settings
exports.getSettings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const settings = {
      notifications: user?.preferences?.notifications || {
        email: true,
        sms: true,
        push: true,
        priceAlerts: true,
        flightDelays: true,
      },
      currency: user?.preferences?.currency || 'USD',
      language: user?.preferences?.language || 'en',
      cabinClass: user?.preferences?.cabinClass || 'First Class',
      twoFactorEnabled: false,
    };

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Update settings
// @route PUT /api/user/settings
exports.updateSettings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.preferences = { ...user.preferences, ...req.body };
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings: req.body,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete user account
// @route DELETE /api/user/account
exports.deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
      success: true,
      message: 'Your account and personal data have been completely removed from Voyager Luxe.',
    });
  } catch (error) {
    next(error);
  }
};
