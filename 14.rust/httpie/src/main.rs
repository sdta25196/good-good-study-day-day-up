fn main() {
    struct User {
        username: String,
        email: String,
        sign_in_count: u64,
        active: bool,
    }

    let user1 = User {
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        active: true,
        sign_in_count: 6,
    };

    let usr2 = User { ..user1 };
}
