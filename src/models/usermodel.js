class User {
    UserId = 0;
    FirstName = "";
    MiddleName = "";
    LastName = "";
    Description = "";
    OfficeName = "";
    Title = "";
    ImageName = "";
    Email = "";
    City = "";
    State = "";
    ZipCode = "";
    DentrixProviderId = "";
    PublicProfile = "";
    WebsiteURL = "";
    TeamMemberUserId = 0;
    Location = "";
    IsTDO = false;
    ProfileComplete = 0;
    Profilepercentage = "";
    RemainList = "";
    Institute = "";
    MemberShip = "";
    EncryptUserId = "";
    LocationId = 0;
    Salutation = "";
    specialtyIds = "";
    GallaryPath = "";
    lstBanner = [];
    lstGallary = [];
    lstInsurance = [];
    lstDoctorAddressDetails = [];
    lstDoctorSortedAddressDetails = [];
    lstEducationandTraining = [];
    lstProfessionalMemberships = [];
    lstSpeacilitiesOfDoctor = [];
    lstProcedure = [];
    licensedetails = [];
    objLicense = {};
    ObjProfileSection = {};
    lstDoctorAddressDetailsByAddressInfoID = [];
    lstGetSocialMediaDetailByUserId = [];
    lstEducationandTrainingForDoctorById = [];
    lstProfessionalMembershipForDoctorById = [];
    lstsecondarywebsitelist = [];
    lstTimeZone = [];
    lstTeamMemberDetailsForDoctor = [];
    IsRewardPatner = false;
}

class Banner {
    BannerId = 0;
    UserId = 0;
    Title = "";
    Path = "";
    ImagePath = "";
    BannerImage = File;
    ColorCode = "";
    Position = 0;
}

class Gallery {
    GallaryId = 0;
    VideoURL = "";
    File = File;
    FilePath = "";
    FileName = "";
    UserId = "";
}

class Insurance {
    InsuranceId = 0;
    UserId = 0;
    Ischeck = false;
    Member_InsuranceId = 0;
    Name = "";
    LogoPath = "";
    Description = "";
    Link = "";
    lstInsurance = [];
    CurrentPageNo = 0;
    LocationId = 0;
}

class AddressDetails {
    AddressInfoID = 0;
    ExactAddress = "";
    Address2 = "";
    City = "";
    State = "";
    Country = "";
    ZipCode = "";
    EmailAddress = "";
    Phone = "";
    Fax = "";
    ContactType = 0;
    Location = "";
    TimeZoneId = 0;
    Mobile = "";
    Website = "";
    ExternalPMSId = "";
    InternalId = "";
    SchedulingLink = "";
    IsSyncS1p = false;
    CountryList = [];
    StateList = [];
}

class StateList {
    StateCode = "";
    StateName = "";
}

class TimeZones {
    TimeZoneId = 0;
    TimeZoneText = "";
}
