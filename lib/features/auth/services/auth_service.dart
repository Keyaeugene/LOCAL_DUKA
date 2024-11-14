import 'package:flutter/material.dart';
import 'package:flutter_e_commerce/constants/error_handling.dart';
import 'package:flutter_e_commerce/constants/global_variables.dart';
import 'package:flutter_e_commerce/constants/utilis.dart';
import 'package:http/http.dart' as http;
import '../../../models/user.dart';

class AuthService {
  //sign up userr
  void signUpUser({
    required BuildContext context,
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      User user = User(
        id: '',
        name: name,
        email: email,
        password: password,
        address: '',
        type: '',
        token: '',
      );

      http.Response res = await http.post(
        Uri.parse('$uri/api/signup'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          showSnackBar(
              context, 'Account created!,Login with the same credentials.');
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
