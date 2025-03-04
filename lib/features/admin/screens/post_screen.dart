import 'package:flutter/material.dart';

import 'add_product_screen.dart';

class PostScreen extends StatefulWidget {
  const PostScreen({super.key});

  @override
  State<PostScreen> createState() => _PostScreenState();
}

class _PostScreenState extends State<PostScreen> {
  void navigatetoAddProduct() {
    Navigator.pushNamed(context, AddProductScreen.routeName);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: const Center(
        child: Text('Products'),
      ),
      floatingActionButton: FloatingActionButton(
          child: const Icon(Icons.add),
          onPressed: navigatetoAddProduct,
          tooltip: 'Add a Product'),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}
