class User {
  constructor(data) {
    this.firstName = String(data.firstName || '');
    this.middleName = String(data.middleName || '');
    this.lastName = String(data.lastName || '');
    this.email = String(data.email || '');
    this.phone = String(data.phone || '');
    this.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
    this.region = String(data.region || '');
    this.oversea = data.oversea === 'yes';
    this.educationLevel = String(data.educationLevel || '');
    this.professionalField = String(data.professionalField || '');
    this.country = String(data.country || '');
  }

  isValid() {
    return this.firstName && this.lastName && this.email;
  }

  toSQLValues() {
    return [
      this.firstName,
      this.middleName,
      this.lastName,
      this.email,
      this.phone,
      this.dateOfBirth,
      this.region,
      this.oversea,
      this.educationLevel,
      this.professionalField,
      this.country
    ];
  }
}

module.exports = User;