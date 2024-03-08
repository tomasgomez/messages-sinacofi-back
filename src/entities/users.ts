
class User {
    id!: number;
    password!: string;
    last_login!: Date;
    is_superuser!: boolean;
    username!: string;
    first_name!: string;    
    last_name!: string;
    email!: string;
    is_staff!: boolean;
    is_active!: boolean;
    date_joined!: Date;
    bank_id!: number;
    status!: string;
    phone!: string;
    send_me_emails!: boolean;
    // bf_data_process_bank: Bank;
    // accounts_user_groups!: Group[];
    // accounts_user_user_permissions!: UserPermission[];
    // django_admin_log!: AdminLog[];
    // mailing_mail!: Mail[];
}