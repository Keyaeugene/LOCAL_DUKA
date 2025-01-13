import 'package:flutter/material.dart';

import '../../../constants/global_variables.dart';

class Orders extends StatefulWidget {
  const Orders({super.key});

  @override
  State<Orders> createState() => _OrdersState();
}

class _OrdersState extends State<Orders> {
// temporary list
  List list = [
    'https://unsplash.com/photos/a-woman-sitting-at-a-table-using-a-cell-phone-nplkFSNschY',
    'https://unsplash.com/photos/a-woman-sitting-at-a-table-using-a-cell-phone-nplkFSNschY',
    'https://unsplash.com/photos/a-woman-sitting-at-a-table-using-a-cell-phone-nplkFSNschY',
    'https://unsplash.com/photos/a-woman-sitting-at-a-table-using-a-cell-phone-nplkFSNschY',
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.only(
                left: 15,
              ),
              child: const Text(
                'Your Orders',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(
                right: 15,
              ),
              child: Text(
                'See all',
                style: TextStyle(
                  color: GlobalVariables.selectedNavBarColor,
                ),
              ),
            ),
          ],
        ),
        Container(
          height: 170,
          padding: const EdgeInsets.only(left: 10, top: 20, right: 0),
          child: ListView.builder(
            itemCount: 3,
            itemBuilder: (context, index) {},
          ),
        ),
      ],
    );
  }
}
