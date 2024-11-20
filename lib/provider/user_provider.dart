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

  void setUSer(String user) {
    _user = User.fromJson(user);
    notifyListeners();
  }
}
