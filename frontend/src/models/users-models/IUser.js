/**
 * @typedef {Object} IProfile
 * @property {string} name
 * @property {string} surname
 * @property {string} phone_number
 * @property {string} date_of_birth
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
 * @typedef {Object} IUser
 * @property {number} id
 * @property {string} email
 * @property {boolean} is_active
 * @property {boolean} is_staff
 * @property {boolean} is_superuser
 * @property {IProfile|null} profile
 */