import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import login_test
import models

USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"


class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERS_INPUT: {
                    'setPlayer': "userA",
                },
                EXPECTED_OUTPUT: {
                    'X': "userA",
                }
            },
            {
                USERS_INPUT: {
                    'setPlayer': "userB",
                },
                EXPECTED_OUTPUT: {
                    'X': "userA",
                    'O': "userB",
                }
            },
            # TODO add another test case
        ]
        self.failure_test_params = [
            {
                USERS_INPUT: {
                    'setPlayer': "userA",
                },
                EXPECTED_OUTPUT: {
                    'O': "userA",
                }
            },
            {
                USERS_INPUT: {
                    'setPlayer': "userB",
                },
                EXPECTED_OUTPUT: {
                    'O': "userA",
                    'spectator': ["userB"],
                }
            },
            # TODO add another test case
        ]
        self.success_test_params_2 = [
            {
                USERS_INPUT: {
                    'setPlayer': "specA",
                },
                EXPECTED_OUTPUT: {
                    'X': "userA",
                    'O': "userB",
                    'spectator': ["specA"]
                }
            },
            # TODO add another test case
        ]

    def test_add_user(self):
        for test in self.success_test_params:
            actual_result = login_test(test[USERS_INPUT])

            expected_result = test[EXPECTED_OUTPUT]

            self.assertEqual(actual_result, expected_result)

    def test_add_user_2(self):
        for test in self.failure_test_params:
            actual_result = login_test(test[USERS_INPUT])

            expected_result = test[EXPECTED_OUTPUT]

            self.assertNotEqual(actual_result, expected_result)

    def test_dict_user(self):
        for test in self.success_test_params_2:
            actual_result = login_test(test[USERS_INPUT])

            expected_result = test[EXPECTED_OUTPUT]

            self.assertDictEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()
