import 'package:flutter/material.dart';
import 'package:flutter_e_commerce/provider/user_provider.dart';
import 'package:provider/provider.dart';
import '../../../constants/global_variables.dart';

class BelowAppBar extends StatelessWidget {
  const BelowAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context).user;
    return Container(
      decoration: const BoxDecoration(
        gradient: GlobalVariables.appBarGradient,
      ),
      padding: const EdgeInsets.only(left: 10, right: 10, bottom: 10),
      child: RichText(
        text: TextSpan(
            text: 'Hello',
            style: TextStyle(
              fontSize: 22,
              color: Colors.black,
            ),
            children: [
              TextSpan(
                text: user.name,
                style: TextStyle(
                  fontSize: 22,
                  color: Colors.black,
                  fontWeight: FontWeight.w600,
                ),
              )
            ]),
      ),
    );
  }
}
