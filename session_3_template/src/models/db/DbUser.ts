
export interface DbUser {
    user_id: number;
    user_uuid: string;
    email: string;
    password_hash: string;
    created_at: string;
    modified_at: string;

    // is_deleted?: boolean; // Uncomment if you decide to use it
}