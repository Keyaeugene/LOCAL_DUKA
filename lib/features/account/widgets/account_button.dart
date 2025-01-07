import 'package:flutter/material.dart';

class AccountButton extends StatelessWidget {
  const AccountButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 10),
      height: 40,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.white, width: 0.0),
        borderRadius: BorderRadius.circular(50),
        color: Colors.white,
      ),
    );
  }
}
