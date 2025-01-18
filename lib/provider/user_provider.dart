import 'package:flutter/material.dart';
import '../models/user.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(
    id: '',
    name: '',
    email: '',
    password: '',
    address: '',
    type: '',
    token: '',
  );
  User get user => _user;

  void setUSer(String userJson) {
    try {
      _user = User.fromJson(userJson);
      notifyListeners();
    } catch (e) {
      print('Eror setting user: $e');
    }
  }
}
