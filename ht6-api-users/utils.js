// utils.js
import validator from 'validator';

/**
 * Valida que el DPI tenga exactamente 13 dígitos numéricos.
 * @param {string} dpi - El DPI a validar.
 * @returns {boolean} - True si es válido, false si no.
 */
export const validateDPI = (dpi) => {
  const dpiRegex = /^[0-9]{13}$/;
  return dpiRegex.test(dpi);
};

/**
 * Valida que el email tenga un formato válido.
 * @param {string} email - El email a validar.
 * @returns {boolean} - True si es válido, false si no.
 */
export const validateEmail = (email) => {
  return validator.isEmail(email);
};

/**
 * Valida que la contraseña cumpla con los requisitos de seguridad:
 * - Al menos 8 caracteres.
 * - Al menos una letra mayúscula.
 * - Al menos un número.
 * - Al menos un símbolo.
 * @param {string} password - La contraseña a validar.
 * @returns {boolean} - True si es válida, false si no.
 */
export const validatePassword = (password) => {
  // Expresión regular:
  // (?=.*[A-Z]) - Al menos una mayúscula (lookahead)
  // (?=.*\d) - Al menos un número (lookahead)
  // (?=.*[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]) - Al menos un símbolo (lookahead)
  // .{8,} - Al menos 8 caracteres
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]).{8,}$/;
  return passwordRegex.test(password);
};
