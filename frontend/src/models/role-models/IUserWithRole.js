/**
 * @typedef {Object} IProfile
 * @property {string} name
 * @property {string} surname
 * @property {string} phone_number
 * @property {string} date_of_birth
 * @property {number} age
 * @property {number} height
 * @property {number} weight
 * @property {string} street
 * @property {string} house
 * @property {string} city
 * @property {string} region
 * @property {string} country
 * @property {string} gender
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} IUserWithRole
 * @property {number} id
 * @property {string} email
 * @property {boolean} is_active
 * @property {boolean} is_staff
 * @property {boolean} is_superuser
 * @property {string} last_login
 * @property {string} created_at
 * @property {string} updated_at
 * @property {IProfile} profile
 */

/**
 * @typedef {Object} IRole
 * @property {number} id
 * @property {"doctor"|"pharmacist"|"operator"} role
 * @property {string|null} specialty
 * @property {boolean} is_available_for_booking
 * @property {IUserWithRole} user
 */