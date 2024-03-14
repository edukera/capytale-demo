export const programTree = {
  "type": "Script",
  "value": "# Liste de nombres à vérifier\nnombres = [1, 2, 3, 4, 5]\n\nfor nombre in nombres:\n  if nombre % 2 == 0:\n    print(f\"{nombre} est pair.\")\n  else:\n    print(f\"{nombre} est impair.\")\n\nprint(\"Fin de la vérification.\")\n",
  "children": [
    {
      "type": "Comment",
      "value": "# Liste de nombres à vérifier"
    },
    {
      "type": "AssignStatement",
      "value": "nombres = [1, 2, 3, 4, 5]",
      "children": [
        {
          "type": "VariableName",
          "value": "nombres"
        },
        {
          "type": "AssignOp",
          "value": "="
        },
        {
          "type": "ArrayExpression",
          "value": "[1, 2, 3, 4, 5]",
          "children": [
            {
              "type": "[",
              "value": "["
            },
            {
              "type": "Number",
              "value": "1"
            },
            {
              "type": ",",
              "value": ","
            },
            {
              "type": "Number",
              "value": "2"
            },
            {
              "type": ",",
              "value": ","
            },
            {
              "type": "Number",
              "value": "3"
            },
            {
              "type": ",",
              "value": ","
            },
            {
              "type": "Number",
              "value": "4"
            },
            {
              "type": ",",
              "value": ","
            },
            {
              "type": "Number",
              "value": "5"
            },
            {
              "type": "]",
              "value": "]"
            }
          ]
        }
      ]
    },
    {
      "type": "ForStatement",
      "value": "for nombre in nombres:\n  if nombre % 2 == 0:\n    print(f\"{nombre} est pair.\")\n  else:\n    print(f\"{nombre} est impair.\")\n",
      "children": [
        {
          "type": "for",
          "value": "for"
        },
        {
          "type": "VariableName",
          "value": "nombre"
        },
        {
          "type": "in",
          "value": "in"
        },
        {
          "type": "VariableName",
          "value": "nombres"
        },
        {
          "type": "Body",
          "value": ":\n  if nombre % 2 == 0:\n    print(f\"{nombre} est pair.\")\n  else:\n    print(f\"{nombre} est impair.\")\n",
          "children": [
            {
              "type": ":",
              "value": ":"
            },
            {
              "type": "IfStatement",
              "value": "if nombre % 2 == 0:\n    print(f\"{nombre} est pair.\")\n  else:\n    print(f\"{nombre} est impair.\")\n",
              "children": [
                {
                  "type": "if",
                  "value": "if"
                },
                {
                  "type": "BinaryExpression",
                  "value": "nombre % 2 == 0",
                  "children": [
                    {
                      "type": "BinaryExpression",
                      "value": "nombre % 2",
                      "children": [
                        {
                          "type": "VariableName",
                          "value": "nombre"
                        },
                        {
                          "type": "ArithOp",
                          "value": "%"
                        },
                        {
                          "type": "Number",
                          "value": "2"
                        }
                      ]
                    },
                    {
                      "type": "CompareOp",
                      "value": "=="
                    },
                    {
                      "type": "Number",
                      "value": "0"
                    }
                  ]
                },
                {
                  "type": "Body",
                  "value": ":\n    print(f\"{nombre} est pair.\")\n",
                  "children": [
                    {
                      "type": ":",
                      "value": ":"
                    },
                    {
                      "type": "ExpressionStatement",
                      "value": "print(f\"{nombre} est pair.\")",
                      "children": [
                        {
                          "type": "CallExpression",
                          "value": "print(f\"{nombre} est pair.\")",
                          "children": [
                            {
                              "type": "VariableName",
                              "value": "print"
                            },
                            {
                              "type": "ArgList",
                              "value": "(f\"{nombre} est pair.\")",
                              "children": [
                                {
                                  "type": "(",
                                  "value": "("
                                },
                                {
                                  "type": "FormatString",
                                  "value": "f\"{nombre} est pair.\"",
                                  "children": [
                                    {
                                      "type": "FormatReplacement",
                                      "value": "{nombre}",
                                      "children": [
                                        {
                                          "type": "{",
                                          "value": "{"
                                        },
                                        {
                                          "type": "VariableName",
                                          "value": "nombre"
                                        },
                                        {
                                          "type": "}",
                                          "value": "}"
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "type": ")",
                                  "value": ")"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "else",
                  "value": "else"
                },
                {
                  "type": "Body",
                  "value": ":\n    print(f\"{nombre} est impair.\")\n",
                  "children": [
                    {
                      "type": ":",
                      "value": ":"
                    },
                    {
                      "type": "ExpressionStatement",
                      "value": "print(f\"{nombre} est impair.\")",
                      "children": [
                        {
                          "type": "CallExpression",
                          "value": "print(f\"{nombre} est impair.\")",
                          "children": [
                            {
                              "type": "VariableName",
                              "value": "print"
                            },
                            {
                              "type": "ArgList",
                              "value": "(f\"{nombre} est impair.\")",
                              "children": [
                                {
                                  "type": "(",
                                  "value": "("
                                },
                                {
                                  "type": "FormatString",
                                  "value": "f\"{nombre} est impair.\"",
                                  "children": [
                                    {
                                      "type": "FormatReplacement",
                                      "value": "{nombre}",
                                      "children": [
                                        {
                                          "type": "{",
                                          "value": "{"
                                        },
                                        {
                                          "type": "VariableName",
                                          "value": "nombre"
                                        },
                                        {
                                          "type": "}",
                                          "value": "}"
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "type": ")",
                                  "value": ")"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "ExpressionStatement",
      "value": "print(\"Fin de la vérification.\")",
      "children": [
        {
          "type": "CallExpression",
          "value": "print(\"Fin de la vérification.\")",
          "children": [
            {
              "type": "VariableName",
              "value": "print"
            },
            {
              "type": "ArgList",
              "value": "(\"Fin de la vérification.\")",
              "children": [
                {
                  "type": "(",
                  "value": "("
                },
                {
                  "type": "String",
                  "value": "\"Fin de la vérification.\""
                },
                {
                  "type": ")",
                  "value": ")"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}