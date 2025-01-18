import 'dart:convert';

class User {
  final String id;
  final String name;
  final String email;
  final String password;
  final String address;
  final String type;
  final String token;

  User({
    String? id,
    required this.name,
    required this.email,
    required this.password,
    String? address,
    String? type,
    String? token,
  })  : id = id ?? '',
        address = address ?? '',
        type = type ?? '',
        token = token ?? '';

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'password': password,
      'address': address,
      'type': type,
      'token': token,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['_id'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      password: map['password'] ?? '',
      address: map['address'] ?? '',
      type: map['type'] ?? '',
      token: map['token'] ?? '',
    );
  }

  // Ensure JSON conversion handles potential null values
  String toJson() => json.encode(toMap());

  // Robust JSON parsing
  factory User.fromJson(String source) {
    try {
      return User.fromMap(json.decode(source));
    } catch (e) {
      print('Error parsing user JSON: $e');

      return User(
        name: '',
        email: '',
        password: '',
      );
    }
  }
}
