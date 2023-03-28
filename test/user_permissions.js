module.exports =  class User {

    constructor (user, pwd){
        this.userData = [
            { 
                "username": process.env.TEST_SYSTEM_OPERATOR_USER,
                "password": process.env.TEST_SYSTEM_OPERATOR_PWD,
                // User API Permissions
                "userReadStatus": 200,
                "userCreateStatus": 200,
                "userEditStatus": 200,
                "userDeleteStatus": 200,
                "accountUserSearch": 200,
                "canModifyUser": true,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 200,
                "ibofangaUserCreateStatus": 200,
                "ibofangaUserEditStatus": 200,
                "ibofangaUserDeleteStatus": 200,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 200,
                "structureEditStatus": 200,
                "structureDeleteStatus": 200,
                "structureAdjustStatus": 200,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 200,
                "siteEditStatus": 200,
                "siteDeleteStatus": 200,
                // Account API Permissions
                "accountUserSearchStatus": 200,
                "accountReadStatus": 200,
                "accountUpdateStatus": 200,
                "inviteGuestUserStatus": 200,
                "guestUserReadStatus": 200,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 200,
                // Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 200,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 200,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 200,
                "alertSubscriptionStructureUpdate": 200,
                "alertSubscriptionStructureDelete": 200,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 200,
                "alertSubscriptionDeviceDelete": 200,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 200,
                "ibofangaDeviceRead": 200,
                "ibofangaDeviceUpdate": 200,
                "ibofangaDeviceDelete": 200,
                "permissionView": 200,
                "roleRead": 200,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 200,
                "ibofangaAccountRead": 200,
                "ibofangaAccountUpdate": 200,
                "ibofangaGuestUserInvite": 200,
                "ibofangaGuestUserRead": 200,
                "ibofangaGuestUserDelete": 200,
                "ibofangaAccountUsersRead": 200,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 200,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 200,
                "ibofangaAccountDeviceRead": 200,
                "ibofangaModuleAdd": 200,
                "ibofangaModuleDelete": 200,
                "ibofangaEntitlementAdd": 200
            },
            {
                "username": process.env.TEST_SUPER_ADMIN_USER,
                "password": process.env.TEST_SUPER_ADMIN_PWD,
                // User API Permissions
                "userReadStatus": 200,
                "userCreateStatus": 200,
                "userEditStatus": 200,
                "userDeleteStatus": 200,
                "accountUserSearch": 200,
                "canModifyUser": true,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 200,
                "ibofangaUserCreateStatus": 200,
                "ibofangaUserEditStatus": 200,
                "ibofangaUserDeleteStatus": 200,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 200,
                "structureEditStatus": 200,
                "structureDeleteStatus": 200,
                "structureAdjustStatus": 200,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 200,
                "siteEditStatus": 200,
                "siteDeleteStatus": 200,
                // Account API Permissions
                "accountUserSearchStatus": 200,
                "accountReadStatus": 200,
                "accountUpdateStatus": 200,
                "inviteGuestUserStatus": 200,
                "guestUserReadStatus": 200,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 200,
                //Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 200,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 200,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 200,
                "alertSubscriptionStructureUpdate": 200,
                "alertSubscriptionStructureDelete": 200,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 200,
                "alertSubscriptionDeviceDelete": 200,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 200,
                "ibofangaDeviceRead": 200,
                "ibofangaDeviceUpdate": 200,
                "ibofangaDeviceDelete": 200,
                "permissionView": 200,
                "roleRead": 200,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 200,
                "ibofangaAccountRead": 200,
                "ibofangaAccountUpdate": 200,
                "ibofangaGuestUserInvite": 200,
                "ibofangaGuestUserRead": 200,
                "ibofangaGuestUserDelete": 200,
                "ibofangaAccountUsersRead": 200,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 200,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 200,
                "ibofangaAccountDeviceRead": 200,
                "ibofangaModuleAdd": 200,
                "ibofangaModuleDelete": 200,
                "ibofangaEntitlementAdd": 200

            },
            {
                "username": process.env.TEST_TRUSTED_USER,
                "password": process.env.TEST_TRUSTED_PWD,
                // User API Permissions
                "userReadStatus": 200,
                "userCreateStatus": 200,
                "userEditStatus": 200,
                "userDeleteStatus": 200,
                "accountUserSearch": 200,
                "canModifyUser": true,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 200,
                "ibofangaUserCreateStatus": 200,
                "ibofangaUserEditStatus": 200,
                "ibofangaUserDeleteStatus": 200,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 200,
                "structureEditStatus": 200,
                "structureDeleteStatus": 200,
                "structureAdjustStatus": 200,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 200,
                "siteEditStatus": 200,
                "siteDeleteStatus": 200,
                // Account API Permissions
                "accountUserSearchStatus": 200,
                "accountReadStatus": 200,
                "accountUpdateStatus": 403,
                "inviteGuestUserStatus": 200,
                "guestUserReadStatus": 200,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 200,
                //Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 200,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 200,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 200,
                "alertSubscriptionStructureUpdate": 200,
                "alertSubscriptionStructureDelete": 200,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 200,
                "alertSubscriptionDeviceDelete": 403,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 403,
                "ibofangaDeviceRead": 200,
                "ibofangaDeviceUpdate": 403,
                "ibofangaDeviceDelete": 403,
                "permissionView": 200,
                "roleRead": 200,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 403,
                "ibofangaAccountRead": 200,
                "ibofangaAccountUpdate": 403,
                "ibofangaGuestUserInvite": 200,
                "ibofangaGuestUserRead": 200,
                "ibofangaGuestUserDelete": 200,
                "ibofangaAccountUsersRead": 200,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 200,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 200,
                "ibofangaAccountDeviceRead": 200,
                "ibofangaModuleAdd": 200,
                "ibofangaModuleDelete": 200,
                "ibofangaEntitlementAdd": 200

            },
            {
                "username": process.env.TEST_ADMIN_USER,
                "password": process.env.TEST_ADMIN_PWD,
                // User API Permissions
                "userReadStatus": 200,
                "userCreateStatus": 200,
                "userEditStatus": 200,
                "userDeleteStatus": 200,
                "accountUserSearch": 200,
                "canModifyUser": true,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 403,
                "ibofangaUserCreateStatus": 403,
                "ibofangaUserEditStatus": 403,
                "ibofangaUserDeleteStatus": 403,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 200,
                "structureEditStatus": 200,
                "structureDeleteStatus": 200,
                "structureAdjustStatus": 200,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 200,
                "siteEditStatus": 200,
                "siteDeleteStatus": 200,
                // Account API Permissions
                "accountUserSearchStatus": 200,
                "accountReadStatus": 200,
                "accountUpdateStatus": 403,
                "inviteGuestUserStatus": 200,
                "guestUserReadStatus": 200,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 200,
                // Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 200,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 200,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 200,
                "alertSubscriptionStructureUpdate": 200,
                "alertSubscriptionStructureDelete": 200,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 200,
                "alertSubscriptionDeviceDelete": 403,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 403,
                "ibofangaDeviceRead": 403,
                "ibofangaDeviceUpdate": 403,
                "ibofangaDeviceDelete": 403,
                "permissionView": 200,
                "roleRead": 200,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 403,
                "ibofangaAccountRead": 403,
                "ibofangaAccountUpdate": 403,
                "ibofangaGuestUserInvite": 403,
                "ibofangaGuestUserRead": 403,
                "ibofangaGuestUserDelete": 403,
                "ibofangaAccountUsersRead": 403,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 403,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 403,
                "ibofangaAccountDeviceRead": 403,
                "ibofangaModuleAdd": 403,
                "ibofangaModuleDelete": 403,
                "ibofangaEntitlementAdd": 403
            },
            {
                "username": process.env.TEST_POWER_USER,
                "password": process.env.TEST_POWER_PWD,
                // User API Permissions
                "userReadStatus": 200,
                "userCreateStatus": 403,
                "userEditStatus": 403,
                "userDeleteStatus": 403,
                "accountUserSearch": 200,
                "canModifyUser": false,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 403,
                "ibofangaUserCreateStatus": 403,
                "ibofangaUserEditStatus": 403,
                "ibofangaUserDeleteStatus": 403,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 200,
                "structureEditStatus": 200,
                "structureDeleteStatus": 403,
                "structureAdjustStatus": 200,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 200,
                "siteEditStatus": 200,
                "siteDeleteStatus": 403,
                // Account API Permissions
                "accountUserSearchStatus": 200,
                "accountReadStatus": 200,
                "accountUpdateStatus": 403,
                "inviteGuestUserStatus": 403,
                "guestUserReadStatus": 200,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 403,
                //Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 200,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 200,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 200,
                "alertSubscriptionStructureUpdate": 403,
                "alertSubscriptionStructureDelete": 403,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 403,
                "alertSubscriptionDeviceDelete": 403,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 403,
                "ibofangaDeviceRead": 403,
                "ibofangaDeviceUpdate": 403,
                "ibofangaDeviceDelete": 403,
                "permissionView": 403,
                "roleRead": 403,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 403,
                "ibofangaAccountRead": 403,
                "ibofangaAccountUpdate": 403,
                "ibofangaGuestUserInvite": 403,
                "ibofangaGuestUserRead": 403,
                "ibofangaGuestUserDelete": 403,
                "ibofangaAccountUsersRead": 403,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 403,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 403,
                "ibofangaAccountDeviceRead": 403,
                "ibofangaModuleAdd": 403,
                "ibofangaModuleDelete": 403,
                "ibofangaEntitlementAdd": 403
            },
            {
                "username": process.env.TEST_LIMITED_USER,
                "password": process.env.TEST_LIMITED_PWD,
                // User API Permissions
                "userReadStatus": 200,
                "userCreateStatus": 403,
                "userEditStatus": 403,
                "userDeleteStatus": 403,
                "accountUserSearch": 200,
                "canModifyUser": false,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 403,
                "ibofangaUserCreateStatus": 403,
                "ibofangaUserEditStatus": 403,
                "ibofangaUserDeleteStatus": 403,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 403,
                "structureEditStatus": 403,
                "structureDeleteStatus": 403,
                "structureAdjustStatus": 403,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 200,
                "siteEditStatus": 200,
                "siteDeleteStatus": 403,
                // Account API Permissions
                "accountUserSearchStatus": 200,
                "accountReadStatus": 200,
                "accountUpdateStatus": 403,
                "inviteGuestUserStatus": 403,
                "guestUserReadStatus": 403,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 403,
                //Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 200,
                "dashboardEditStatus": 200,
                "dashboardDeleteStatus": 403,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 200,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 403,
                "alertSubscriptionStructureUpdate": 403,
                "alertSubscriptionStructureDelete": 403,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 403,
                "alertSubscriptionDeviceDelete": 403,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 403,
                "ibofangaDeviceRead": 403,
                "ibofangaDeviceUpdate": 403,
                "ibofangaDeviceDelete": 403,
                "permissionView": 403,
                "roleRead": 403,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 403,
                "ibofangaAccountRead": 403,
                "ibofangaAccountUpdate": 403,
                "ibofangaGuestUserInvite": 403,
                "ibofangaGuestUserRead": 403,
                "ibofangaGuestUserDelete": 403,
                "ibofangaAccountUsersRead": 403,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 403,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 403,
                "ibofangaAccountDeviceRead": 403,
                "ibofangaModuleAdd": 403,
                "ibofangaModuleDelete": 403,
                "ibofangaEntitlementAdd": 403
            },
            {
                "username": process.env.TEST_READ_ONLY_USER,
                "password": process.env.TEST_READ_ONLY_PWD,
                // User API Permissions
                "userReadStatus": 403,
                "userCreateStatus": 403,
                "userEditStatus": 403,
                "userDeleteStatus": 403,
                "accountUserSearch": 200,
                "canModifyUser": false,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 403,
                "ibofangaUserCreateStatus": 403,
                "ibofangaUserEditStatus": 403,
                "ibofangaUserDeleteStatus": 403,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 403,
                "structureEditStatus": 403,
                "structureDeleteStatus": 403,
                "structureAdjustStatus": 403,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 403,
                "siteEditStatus": 403,
                "siteDeleteStatus": 403,
                // Account API Permissions
                "accountUserSearchStatus": 403,
                "accountReadStatus": 200,
                "accountUpdateStatus": 403,
                "inviteGuestUserStatus": 403,
                "guestUserReadStatus": 403,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 403,
                //Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 403,
                "dashboardEditStatus": 403,
                "dashboardDeleteStatus": 403,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 200,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 403,
                "alertSubscriptionStructureUpdate": 403,
                "alertSubscriptionStructureDelete": 403,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 403,
                "alertSubscriptionDeviceDelete": 403,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 403,
                "ibofangaDeviceRead": 403,
                "ibofangaDeviceUpdate": 403,
                "ibofangaDeviceDelete": 403,
                "permissionView": 403,
                "roleRead": 403,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 403,
                "ibofangaAccountRead": 403,
                "ibofangaAccountUpdate": 403,
                "ibofangaGuestUserInvite": 403,
                "ibofangaGuestUserRead": 403,
                "ibofangaGuestUserDelete": 403,
                "ibofangaAccountUsersRead": 403,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 403,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 403,
                "ibofangaAccountDeviceRead": 403,
                "ibofangaModuleAdd": 403,
                "ibofangaModuleDelete": 403,
                "ibofangaEntitlementAdd": 403
            },
            {
                "username": process.env.TEST_REPORTING_ONLY_USER,
                "password": process.env.TEST_REPORTING_ONLY_PWD,
                // User API Permissions
                "userReadStatus": 403,
                "userCreateStatus": 403,
                "userEditStatus": 403,
                "userDeleteStatus": 403,
                "accountUserSearch": 200,
                "canModifyUser": false,
                // Ibofanga User API Permissions
                "ibonfangaUserReadStatus": 403,
                "ibofangaUserCreateStatus": 403,
                "ibofangaUserEditStatus": 403,
                "ibofangaUserDeleteStatus": 403,
                // Structure API Permissions
                "structureReadStatus": 200,
                "structureAddStatus": 403,
                "structureEditStatus": 403,
                "structureDeleteStatus": 403,
                "structureAdjustStatus": 403,
                // Site API Permissions
                "siteReadStatus": 200,
                "siteAddStatus": 403,
                "siteEditStatus": 403,
                "siteDeleteStatus": 403,
                // Account API Permissions
                "accountUserSearchStatus": 403,
                "accountReadStatus": 200,
                "accountUpdateStatus": 403,
                "inviteGuestUserStatus": 403,
                "guestUserReadStatus": 403,
                "switchAccountStatus": 200,
                "guestUserDeleteStatus": 403,
                //Entitlement API Permissions
                "entitlementReadStatus": 200,
                "moduleReadStatus": 200,
                // Dashboard API Permissions
                "dashboardReadStatus": 200,
                "dashboardCreateStatus": 403,
                "dashboardEditStatus": 403,
                "dashboardDeleteStatus": 403,
                // Device Type API Permissions
                "deviceTypeRead": 200,
                "deviceTypeDetailsRead": 403,
                // Alert API Permissions
                "alertRead": 200,
                "alertSubscriptionRead": 200,
                "alertSubscriptionStructureCreate": 403,
                "alertSubscriptionStructureUpdate": 403,
                "alertSubscriptionStructureDelete": 403,
                "alertSubscriptionDeviceCreate": 200,
                "alertSubscriptionDeviceUpdate": 403,
                "alertSubscriptionDeviceDelete": 403,
                // Ibofanga Device Permissions
                "ibofangaDeviceCreate": 403,
                "ibofangaDeviceRead": 403,
                "ibofangaDeviceUpdate": 403,
                "ibofangaDeviceDelete": 403,
                "permissionView": 403,
                "roleRead": 403,
                // Ibofanga Account Permissions
                "ibofangaAccountCreate": 403,
                "ibofangaAccountRead": 403,
                "ibofangaAccountUpdate": 403,
                "ibofangaGuestUserInvite": 403,
                "ibofangaGuestUserRead": 403,
                "ibofangaGuestUserDelete": 403,
                "ibofangaAccountUsersRead": 403,
                // Ibofanga Impersonation
                "ibofangaImpersonation": 403,
                // Ibofanga Module Entitlements
                "ibofangaEntitlementRead": 403,
                "ibofangaAccountDeviceRead": 403,
                "ibofangaModuleAdd": 403,
                "ibofangaModuleDelete": 403,
                "ibofangaEntitlementAdd": 403
            }
        ];
    }

    getUserPermissions() {
        return this.userData
    }
}