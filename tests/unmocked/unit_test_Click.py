import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import click_test
import models

USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERS_INPUT: [
                    "X", "O"
                ],
                EXPECTED_OUTPUT: [
                    "X", "O"
                ]
            },
        ]
        self.failure_test_params = [
            {
                USERS_INPUT: [
                    "X", "O"
                ],
                EXPECTED_OUTPUT: [
                    "O", "X"
                ]
            },
        ]
        self.failure_test_params_2 = [
            {
                USERS_INPUT: [
                    "O", "X"
                ],
                EXPECTED_OUTPUT: [
                    " ", " "
                ]
            },
        ]

    def test_add_user(self):
        for test in self.success_test_params:
            actual_result = click_test(test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(actual_result, expected_result)
    
    def test_add_user_2(self):
        for test in self.failure_test_params:
            actual_result = click_test(test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertNotEqual(actual_result, expected_result)
    
    def test_add_user_3(self):
        for test in self.failure_test_params_2:
            actual_result = click_test(test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertNotEqual(actual_result, expected_result)
            
if __name__ == '__main__':
    unittest.main()