import PropTypes from 'prop-types';

import {
  userRoles,
  userStatuses
} from './constants';

export const UserType = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  login: PropTypes.string,
  info: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.oneOf(userRoles),
  avatar: PropTypes.string,
  avatarThumbnail: PropTypes.string,
  status: PropTypes.oneOf(userStatuses),
  DoB: PropTypes.instanceOf(Date),
  slack_name: PropTypes.string,
  resetPasswordToken: PropTypes.string,
  resetPasswordExpires: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  slack_conversational_id: PropTypes.string,
  slack_conversational_crm_id: PropTypes.string,
  repo: PropTypes.arrayOf(PropTypes.string)
});

export const ExtraType = PropTypes.shape({
  id: PropTypes.number,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  isProcessed: PropTypes.bool,
  project_id: PropTypes.number,
  user_id: PropTypes.number,
  user: PropTypes.UserType,
});

export const PlanTaskJobType = PropTypes.shape({
  createdAt: PropTypes.string,
  finishTask: PropTypes.string,
  id: PropTypes.number,
  plan_id: PropTypes.number,
  startTask: PropTypes.string,
  status: PropTypes.string,
  taskJob_id: PropTypes.number,
  updatedAt: PropTypes.string,
});
