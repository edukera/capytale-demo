const INITIAL_XML =
  '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

const INITIAL_JSON = {}

const INITIAL_JSON_LIST_2 = {
  "blocks":{
     "languageVersion":0,
     "blocks":[
        {
           "type":"variables_set",
           "id":"P68i`R;MKhM[:AF)$F*-",
           "fields":{
              "VAR":{
                 "id":"YX1D!ol+43n)G,@VgJ3@"
              }
           },
           "inputs":{
              "VALUE":{
                 "block":{
                    "type":"lists_create_with",
                    "id":"2.o^!k.t]nnO(`ZF_:]G",
                    "extraState":{
                       "itemCount":2
                    },
                    "inputs":{
                       "ADD0":{
                          "block":{
                             "type":"math_number",
                             "id":"?,_j5Qv$-2_/BL@yhKz]",
                             "fields":{
                                "NUM":1
                             }
                          }
                       },
                       "ADD1":{
                          "block":{
                             "type":"math_number",
                             "id":"/1%Qkl!~E%+YVK[#c:MH",
                             "fields":{
                                "NUM":2
                             }
                          }
                       },
                    }
                 }
              }
           }
        }
     ]
  },
  "variables":[
     {
        "name":"nombres",
        "id":"YX1D!ol+43n)G,@VgJ3@"
     }
  ]
}

const INITIAL_JSON_LIST_5 = {
  "blocks":{
     "languageVersion":0,
     "blocks":[
        {
           "type":"variables_set",
           "id":"P68i`R;MKhM[:AF)$F*-",
           "fields":{
              "VAR":{
                 "id":"YX1D!ol+43n)G,@VgJ3@"
              }
           },
           "inputs":{
              "VALUE":{
                 "block":{
                    "type":"lists_create_with",
                    "id":"2.o^!k.t]nnO(`ZF_:]G",
                    "extraState":{
                       "itemCount":5
                    },
                    "inputs":{
                       "ADD0":{
                          "block":{
                             "type":"math_number",
                             "id":"?,_j5Qv$-2_/BL@yhKz]",
                             "fields":{
                                "NUM":1
                             }
                          }
                       },
                       "ADD1":{
                          "block":{
                             "type":"math_number",
                             "id":"/1%Qkl!~E%+YVK[#c:MH",
                             "fields":{
                                "NUM":2
                             }
                          }
                       },
                       "ADD2":{
                          "block":{
                             "type":"math_number",
                             "id":"nvkvQ=Lstju%]+T1(V-S",
                             "fields":{
                                "NUM":3
                             }
                          }
                       },
                       "ADD3":{
                          "block":{
                             "type":"math_number",
                             "id":"pKs)9]F-+5(Vh{6y;$rp",
                             "fields":{
                                "NUM":4
                             }
                          }
                       },
                       "ADD4":{
                          "block":{
                             "type":"math_number",
                             "id":"=lz]#Sr3dEiAVMSE}@F4",
                             "fields":{
                                "NUM":5
                             }
                          }
                       }
                    }
                 }
              }
           }
        }
     ]
  },
  "variables":[
     {
        "name":"nombres",
        "id":"YX1D!ol+43n)G,@VgJ3@"
     }
  ]
}

const PROGRAM_JSON = {
  "blocks": {
    "languageVersion": 0,
    "blocks": [
      {
        "type": "variables_set",
        "id": "P68i`R;MKhM[:AF)$F*-",
        "fields": {
          "VAR": {
            "id": "YX1D!ol+43n)G,@VgJ3@"
          }
        },
        "inputs": {
          "VALUE": {
            "block": {
              "type": "lists_create_with",
              "id": "2.o^!k.t]nnO(`ZF_:]G",
              "extraState": {
                "itemCount": 5
              },
              "inputs": {
                "ADD0": {
                  "block": {
                    "type": "math_number",
                    "id": "?,_j5Qv$-2_/BL@yhKz]",
                    "fields": {
                      "NUM": 1
                    }
                  }
                },
                "ADD1": {
                  "block": {
                    "type": "math_number",
                    "id": "/1%Qkl!~E%+YVK[#c:MH",
                    "fields": {
                      "NUM": 2
                    }
                  }
                },
                "ADD2": {
                  "block": {
                    "type": "math_number",
                    "id": "nvkvQ=Lstju%]+T1(V-S",
                    "fields": {
                      "NUM": 3
                    }
                  }
                },
                "ADD3": {
                  "block": {
                    "type": "math_number",
                    "id": "pKs)9]F-+5(Vh{6y;$rp",
                    "fields": {
                      "NUM": 4
                    }
                  }
                },
                "ADD4": {
                  "block": {
                    "type": "math_number",
                    "id": "=lz]#Sr3dEiAVMSE}@F4",
                    "fields": {
                      "NUM": 5
                    }
                  }
                }
              }
            }
          }
        },
        "next": {
          "block": {
            "type": "controls_forEach",
            "id": "Hh8fRIxc`OZjr_dxfPY;",
            "fields": {
              "VAR": {
                "id": "Cg!CSk/ZJo2XQN3=VVrz"
              }
            },
            "inputs": {
              "LIST": {
                "block": {
                  "type": "variables_get",
                  "id": "![JEg;U_3J2=7FBy:PD]",
                  "fields": {
                    "VAR": {
                      "id": "YX1D!ol+43n)G,@VgJ3@"
                    }
                  }
                }
              },
              "DO": {
                "block": {
                  "type": "controls_if",
                  "id": "./Mcsg5dXZ4P@leshYDl",
                  "extraState": {
                    "hasElse": true
                  },
                  "inputs": {
                    "IF0": {
                      "block": {
                        "type": "logic_compare",
                        "id": "at-fGTXFXGX`g:9kBnBj",
                        "fields": {
                          "OP": "EQ"
                        },
                        "inputs": {
                          "A": {
                            "block": {
                              "type": "math_modulo",
                              "id": "w9:x@rMGZb7XDq^(`Zx=",
                              "inputs": {
                                "DIVIDEND": {
                                  "shadow": {
                                    "type": "math_number",
                                    "id": "F9T,X}(aUM_OB#?7m%=d",
                                    "fields": {
                                      "NUM": "64"
                                    }
                                  },
                                  "block": {
                                    "type": "variables_get",
                                    "id": "j*s7}Y%(TC[CK!hLqY~t",
                                    "fields": {
                                      "VAR": {
                                        "id": "Cg!CSk/ZJo2XQN3=VVrz"
                                      }
                                    }
                                  }
                                },
                                "DIVISOR": {
                                  "shadow": {
                                    "type": "math_number",
                                    "id": "3Y|$o?*?Da.e0rMUM`*V",
                                    "fields": {
                                      "NUM": 2
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "B": {
                            "block": {
                              "type": "math_number",
                              "id": "W%S{Q~UZDa36W$nQ.v;f",
                              "fields": {
                                "NUM": 0
                              }
                            }
                          }
                        }
                      }
                    },
                    "DO0": {
                      "block": {
                        "type": "text_print",
                        "id": "_38YN=J^hynPpE45Y1-t",
                        "inputs": {
                          "TEXT": {
                            "shadow": {
                              "type": "text",
                              "id": "wD1N(,PDu.!PT)_g_j(J",
                              "fields": {
                                "TEXT": "{nombre} est pair."
                              }
                            }
                          }
                        }
                      }
                    },
                    "ELSE": {
                      "block": {
                        "type": "text_print",
                        "id": "K*fH$3=i]y.1+N.xs1Nn",
                        "inputs": {
                          "TEXT": {
                            "shadow": {
                              "type": "text",
                              "id": "$6%]zJN}7RKI(Q_jHgp6",
                              "fields": {
                                "TEXT": "{nombre} est impair."
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "next": {
              "block": {
                "type": "text_print",
                "id": "}DR[9nW-LBR_Bt--F:pc",
                "inputs": {
                  "TEXT": {
                    "shadow": {
                      "type": "text",
                      "id": "rn.x~+p2-l:|;CvVLj.+",
                      "fields": {
                        "TEXT": "Fin de la vérification."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]
  },
  "variables": [
    {
      "name": "nombres",
      "id": "YX1D!ol+43n)G,@VgJ3@"
    },
    {
      "name": "nombre",
      "id": "Cg!CSk/ZJo2XQN3=VVrz"
    }
  ]
}

const INITIAL_TOOLBOX_JSON = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Personnalisé",
      colour: 230,
      contents: [
        {
          kind: "block",
          type: "unknown_code"
        },
        {
          kind: "block",
          type: "unknown_expr"
        },
        {
          kind: "block",
          type: "range"
        }
      ]
    },
    {
      kind: "category",
      name: "Logic",
      colour: 210,
      contents: [
        {
          kind: "block",
          type: "controls_if",
        },
        {
          kind: "block",
          blockxml:
            '<block type="logic_compare"><field name="OP">EQ</field></block>',
        },
        {
          kind: "block",
          blockxml:
            '<block type="logic_operation"><field name="OP">AND</field></block>',
        },
        {
          kind: "block",
          type: "logic_negate",
        },
        {
          kind: "block",
          blockxml:
            '<block type="logic_boolean"><field name="BOOL">TRUE</field></block>',
        },
        {
          kind: "block",
          type: "logic_null",
        },
        {
          kind: "block",
          type: "logic_ternary",
        },
      ],
    },
    {
      kind: "category",
      name: "Loops",
      colour: 120,
      contents: [
        {
          kind: "block",
          blockxml:
            '<block type="controls_repeat_ext">\n' +
            '      <value name="TIMES">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">10</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="controls_whileUntil">\n' +
            '      <field name="MODE">WHILE</field>\n' +
            "    </block>",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="controls_for">\n' +
            '      <field name="VAR" id="C(8;cYCF}~vSgkxzJ+{O" variabletype="">i</field>\n' +
            '      <value name="FROM">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">1</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="TO">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">10</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="BY">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">1</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="controls_forEach">\n' +
            '      <field name="VAR" id="Cg!CSk/ZJo2XQN3=VVrz" variabletype="">j</field>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="controls_flow_statements">\n' +
            '      <field name="FLOW">BREAK</field>\n' +
            "    </block>\n",
        },
      ],
    },
    {
      kind: "category",
      name: "Math",
      colour: 230,
      contents: [
        {
          kind: "block",
          blockxml:
            '    <block type="math_round">\n' +
            '      <field name="OP">ROUND</field>\n' +
            '      <value name="NUM">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">3.1</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_number">\n' +
            '      <field name="NUM">0</field>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_single">\n' +
            '      <field name="OP">ROOT</field>\n' +
            '      <value name="NUM">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">9</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_trig">\n' +
            '      <field name="OP">SIN</field>\n' +
            '      <value name="NUM">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">45</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_constant">\n' +
            '      <field name="CONSTANT">PI</field>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_number_property">\n' +
            '      <mutation divisor_input="false"></mutation>\n' +
            '      <field name="PROPERTY">EVEN</field>\n' +
            '      <value name="NUMBER_TO_CHECK">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">0</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_arithmetic">\n' +
            '      <field name="OP">ADD</field>\n' +
            '      <value name="A">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">1</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="B">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">1</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_on_list">\n' +
            '      <mutation op="SUM"></mutation>\n' +
            '      <field name="OP">SUM</field>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_modulo">\n' +
            '      <value name="DIVIDEND">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">64</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="DIVISOR">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">10</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_constrain">\n' +
            '      <value name="VALUE">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">50</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="LOW">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">1</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="HIGH">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">100</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="math_random_int">\n' +
            '      <value name="FROM">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">1</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="TO">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">100</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          type: "math_random_float",
        },
      ],
    },
    {
      kind: "category",
      name: "Text",
      colour: 160,
      contents: [
        {
          kind: "block",
          blockxml:
            '    <block type="text_charAt">\n' +
            '      <mutation at="true"></mutation>\n' +
            '      <field name="WHERE">FROM_START</field>\n' +
            '      <value name="VALUE">\n' +
            '        <block type="variables_get">\n' +
            '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
            "        </block>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text">\n' +
            '      <field name="TEXT"></field>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_append">\n' +
            '      <field name="VAR" id=":};P,s[*|I8+L^-.EbRi" variabletype="">item</field>\n' +
            '      <value name="TEXT">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT"></field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_length">\n' +
            '      <value name="VALUE">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT">abc</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_isEmpty">\n' +
            '      <value name="VALUE">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT"></field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_indexOf">\n' +
            '      <field name="END">FIRST</field>\n' +
            '      <value name="VALUE">\n' +
            '        <block type="variables_get">\n' +
            '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
            "        </block>\n" +
            "      </value>\n" +
            '      <value name="FIND">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT">abc</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_join">\n' +
            '      <mutation items="2"></mutation>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_getSubstring">\n' +
            '      <mutation at1="true" at2="true"></mutation>\n' +
            '      <field name="WHERE1">FROM_START</field>\n' +
            '      <field name="WHERE2">FROM_START</field>\n' +
            '      <value name="STRING">\n' +
            '        <block type="variables_get">\n' +
            '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
            "        </block>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_changeCase">\n' +
            '      <field name="CASE">UPPERCASE</field>\n' +
            '      <value name="TEXT">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT">abc</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_trim">\n' +
            '      <field name="MODE">BOTH</field>\n' +
            '      <value name="TEXT">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT">abc</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_print">\n' +
            '      <value name="TEXT">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT">abc</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="text_prompt_ext">\n' +
            '      <mutation type="TEXT"></mutation>\n' +
            '      <field name="TYPE">TEXT</field>\n' +
            '      <value name="TEXT">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT">abc</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
      ],
    },
    {
      kind: "category",
      name: "Lists",
      colour: 259,
      contents: [
        {
          kind: "block",
          blockxml:
            '    <block type="lists_indexOf">\n' +
            '      <field name="END">FIRST</field>\n' +
            '      <value name="VALUE">\n' +
            '        <block type="variables_get">\n' +
            '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
            "        </block>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_create_with">\n' +
            '      <mutation items="0"></mutation>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_repeat">\n' +
            '      <value name="NUM">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">5</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          type: "lists_length",
        },
        {
          kind: "block",
          type: "lists_isEmpty",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_create_with">\n' +
            '      <mutation items="3"></mutation>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_getIndex">\n' +
            '      <mutation statement="false" at="true"></mutation>\n' +
            '      <field name="MODE">GET</field>\n' +
            '      <field name="WHERE">FROM_START</field>\n' +
            '      <value name="VALUE">\n' +
            '        <block type="variables_get">\n' +
            '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
            "        </block>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_setIndex">\n' +
            '      <mutation at="true"></mutation>\n' +
            '      <field name="MODE">SET</field>\n' +
            '      <field name="WHERE">FROM_START</field>\n' +
            '      <value name="LIST">\n' +
            '        <block type="variables_get">\n' +
            '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
            "        </block>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_getSublist">\n' +
            '      <mutation at1="true" at2="true"></mutation>\n' +
            '      <field name="WHERE1">FROM_START</field>\n' +
            '      <field name="WHERE2">FROM_START</field>\n' +
            '      <value name="LIST">\n' +
            '        <block type="variables_get">\n' +
            '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
            "        </block>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_split">\n' +
            '      <mutation mode="SPLIT"></mutation>\n' +
            '      <field name="MODE">SPLIT</field>\n' +
            '      <value name="DELIM">\n' +
            '        <shadow type="text">\n' +
            '          <field name="TEXT">,</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="lists_sort">\n' +
            '      <field name="TYPE">NUMERIC</field>\n' +
            '      <field name="DIRECTION">1</field>\n' +
            "    </block>\n",
        },
      ],
    },
    {
      kind: "category",
      name: "Colour",
      colour: 19,
      contents: [
        {
          kind: "block",
          blockxml:
            '    <block type="colour_picker">\n' +
            '      <field name="COLOUR">#ff0000</field>\n' +
            "    </block>\n",
        },
        {
          kind: "block",
          type: "colour_random",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="colour_rgb">\n' +
            '      <value name="RED">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">100</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="GREEN">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">50</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="BLUE">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">0</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
        {
          kind: "block",
          blockxml:
            '    <block type="colour_blend">\n' +
            '      <value name="COLOUR1">\n' +
            '        <shadow type="colour_picker">\n' +
            '          <field name="COLOUR">#ff0000</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="COLOUR2">\n' +
            '        <shadow type="colour_picker">\n' +
            '          <field name="COLOUR">#3333ff</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            '      <value name="RATIO">\n' +
            '        <shadow type="math_number">\n' +
            '          <field name="NUM">0.5</field>\n' +
            "        </shadow>\n" +
            "      </value>\n" +
            "    </block>\n",
        },
      ],
    },
    { kind: "sep" },
    {
      kind: "category",
      name: "Variables",
      custom: "VARIABLE",
      colour: 330,
    },
    {
      kind: "category",
      name: "Functions",
      custom: "PROCEDURE",
      colour: 290,
    },
  ],
};

const INITIAL_TOOLBOX_XML =
  '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">\n' +
  '  <category name="Logic" colour="#5C81A6">\n' +
  '    <block type="afficher_texte"></block>\n' +
  '    <block type="controls_if"></block>\n' +
  '    <block type="logic_compare">\n' +
  '      <field name="OP">EQ</field>\n' +
  "    </block>\n" +
  '    <block type="logic_operation">\n' +
  '      <field name="OP">AND</field>\n' +
  "    </block>\n" +
  '    <block type="logic_negate"></block>\n' +
  '    <block type="logic_boolean">\n' +
  '      <field name="BOOL">TRUE</field>\n' +
  "    </block>\n" +
  '    <block type="logic_null"></block>\n' +
  '    <block type="logic_ternary"></block>\n' +
  "  </category>\n" +
  '  <category name="Loops" colour="#5CA65C">\n' +
  '    <block type="controls_repeat_ext">\n' +
  '      <value name="TIMES">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">10</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="controls_whileUntil">\n' +
  '      <field name="MODE">WHILE</field>\n' +
  "    </block>\n" +
  '    <block type="controls_for">\n' +
  '      <field name="VAR" id="C(8;cYCF}~vSgkxzJ+{O" variabletype="">i</field>\n' +
  '      <value name="FROM">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">1</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="TO">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">10</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="BY">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">1</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="controls_forEach">\n' +
  '      <field name="VAR" id="Cg!CSk/ZJo2XQN3=VVrz" variabletype="">j</field>\n' +
  "    </block>\n" +
  '    <block type="controls_flow_statements">\n' +
  '      <field name="FLOW">BREAK</field>\n' +
  "    </block>\n" +
  "  </category>\n" +
  '  <category name="Math" colour="#5C68A6">\n' +
  '    <block type="math_round">\n' +
  '      <field name="OP">ROUND</field>\n' +
  '      <value name="NUM">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">3.1</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_number">\n' +
  '      <field name="NUM">0</field>\n' +
  "    </block>\n" +
  '    <block type="math_single">\n' +
  '      <field name="OP">ROOT</field>\n' +
  '      <value name="NUM">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">9</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_trig">\n' +
  '      <field name="OP">SIN</field>\n' +
  '      <value name="NUM">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">45</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_constant">\n' +
  '      <field name="CONSTANT">PI</field>\n' +
  "    </block>\n" +
  '    <block type="math_number_property">\n' +
  '      <mutation divisor_input="false"></mutation>\n' +
  '      <field name="PROPERTY">EVEN</field>\n' +
  '      <value name="NUMBER_TO_CHECK">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">0</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_arithmetic">\n' +
  '      <field name="OP">ADD</field>\n' +
  '      <value name="A">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">1</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="B">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">1</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_on_list">\n' +
  '      <mutation op="SUM"></mutation>\n' +
  '      <field name="OP">SUM</field>\n' +
  "    </block>\n" +
  '    <block type="math_modulo">\n' +
  '      <value name="DIVIDEND">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">64</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="DIVISOR">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">10</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_constrain">\n' +
  '      <value name="VALUE">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">50</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="LOW">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">1</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="HIGH">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">100</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_random_int">\n' +
  '      <value name="FROM">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">1</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="TO">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">100</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="math_random_float"></block>\n' +
  "  </category>\n" +
  '  <category name="Text" colour="#5CA68D">\n' +
  '    <block type="text_charAt">\n' +
  '      <mutation at="true"></mutation>\n' +
  '      <field name="WHERE">FROM_START</field>\n' +
  '      <value name="VALUE">\n' +
  '        <block type="variables_get">\n' +
  '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
  "        </block>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text">\n' +
  '      <field name="TEXT"></field>\n' +
  "    </block>\n" +
  '    <block type="text_append">\n' +
  '      <field name="VAR" id=":};P,s[*|I8+L^-.EbRi" variabletype="">item</field>\n' +
  '      <value name="TEXT">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT"></field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_length">\n' +
  '      <value name="VALUE">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT">abc</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_isEmpty">\n' +
  '      <value name="VALUE">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT"></field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_indexOf">\n' +
  '      <field name="END">FIRST</field>\n' +
  '      <value name="VALUE">\n' +
  '        <block type="variables_get">\n' +
  '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
  "        </block>\n" +
  "      </value>\n" +
  '      <value name="FIND">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT">abc</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_join">\n' +
  '      <mutation items="2"></mutation>\n' +
  "    </block>\n" +
  '    <block type="text_getSubstring">\n' +
  '      <mutation at1="true" at2="true"></mutation>\n' +
  '      <field name="WHERE1">FROM_START</field>\n' +
  '      <field name="WHERE2">FROM_START</field>\n' +
  '      <value name="STRING">\n' +
  '        <block type="variables_get">\n' +
  '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
  "        </block>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_changeCase">\n' +
  '      <field name="CASE">UPPERCASE</field>\n' +
  '      <value name="TEXT">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT">abc</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_trim">\n' +
  '      <field name="MODE">BOTH</field>\n' +
  '      <value name="TEXT">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT">abc</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_print">\n' +
  '      <value name="TEXT">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT">abc</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="text_prompt_ext">\n' +
  '      <mutation type="TEXT"></mutation>\n' +
  '      <field name="TYPE">TEXT</field>\n' +
  '      <value name="TEXT">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT">abc</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  "  </category>\n" +
  '  <category name="Lists" colour="#745CA6">\n' +
  '    <block type="lists_indexOf">\n' +
  '      <field name="END">FIRST</field>\n' +
  '      <value name="VALUE">\n' +
  '        <block type="variables_get">\n' +
  '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
  "        </block>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="lists_create_with">\n' +
  '      <mutation items="0"></mutation>\n' +
  "    </block>\n" +
  '    <block type="lists_repeat">\n' +
  '      <value name="NUM">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">5</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="lists_length"></block>\n' +
  '    <block type="lists_isEmpty"></block>\n' +
  '    <block type="lists_create_with">\n' +
  '      <mutation items="3"></mutation>\n' +
  "    </block>\n" +
  '    <block type="lists_getIndex">\n' +
  '      <mutation statement="false" at="true"></mutation>\n' +
  '      <field name="MODE">GET</field>\n' +
  '      <field name="WHERE">FROM_START</field>\n' +
  '      <value name="VALUE">\n' +
  '        <block type="variables_get">\n' +
  '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
  "        </block>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="lists_setIndex">\n' +
  '      <mutation at="true"></mutation>\n' +
  '      <field name="MODE">SET</field>\n' +
  '      <field name="WHERE">FROM_START</field>\n' +
  '      <value name="LIST">\n' +
  '        <block type="variables_get">\n' +
  '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
  "        </block>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="lists_getSublist">\n' +
  '      <mutation at1="true" at2="true"></mutation>\n' +
  '      <field name="WHERE1">FROM_START</field>\n' +
  '      <field name="WHERE2">FROM_START</field>\n' +
  '      <value name="LIST">\n' +
  '        <block type="variables_get">\n' +
  '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
  "        </block>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="lists_split">\n' +
  '      <mutation mode="SPLIT"></mutation>\n' +
  '      <field name="MODE">SPLIT</field>\n' +
  '      <value name="DELIM">\n' +
  '        <shadow type="text">\n' +
  '          <field name="TEXT">,</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="lists_sort">\n' +
  '      <field name="TYPE">NUMERIC</field>\n' +
  '      <field name="DIRECTION">1</field>\n' +
  "    </block>\n" +
  "  </category>\n" +
  '  <category name="Colour" colour="#A6745C">\n' +
  '    <block type="colour_picker">\n' +
  '      <field name="COLOUR">#ff0000</field>\n' +
  "    </block>\n" +
  '    <block type="colour_random"></block>\n' +
  '    <block type="colour_rgb">\n' +
  '      <value name="RED">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">100</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="GREEN">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">50</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="BLUE">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">0</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  '    <block type="colour_blend">\n' +
  '      <value name="COLOUR1">\n' +
  '        <shadow type="colour_picker">\n' +
  '          <field name="COLOUR">#ff0000</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="COLOUR2">\n' +
  '        <shadow type="colour_picker">\n' +
  '          <field name="COLOUR">#3333ff</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  '      <value name="RATIO">\n' +
  '        <shadow type="math_number">\n' +
  '          <field name="NUM">0.5</field>\n' +
  "        </shadow>\n" +
  "      </value>\n" +
  "    </block>\n" +
  "  </category>\n" +
  "  <sep></sep>\n" +
  '  <category name="Custom Button" colour="#A6745C">\n' +
  '    <button text="A button" callbackKey="myFirstButtonPressed"></button>\n' +
  "  </category>\n" +
  '  <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>\n' +
  '  <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>\n' +
  "</xml>";

const INITIAL_TOOLBOX_CATEGORIES = [
  {
    name: "Controls",
    blocks: [
      { type: "afficher_texte"},
      { type: "controls_if" },
      {
        type: "controls_repeat_ext",
        values: {
          TIMES: {
            type: "math_number",
            shadow: true,
            fields: {
              NUM: 10,
            },
          },
        },
        statements: {
          DO: {
            type: "text_print",
            shadow: true,
            values: {
              TEXT: {
                type: "text",
                shadow: true,
                fields: {
                  TEXT: "abc",
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: "Text",
    blocks: [
      { type: "text" },
      {
        type: "text_print",
        values: {
          TEXT: {
            type: "text",
            shadow: true,
            fields: {
              TEXT: "abc",
            },
          },
        },
      },
    ],
  },
];

const ConfigFiles = {
  INITIAL_XML,
  INITIAL_JSON,
  INITIAL_JSON_LIST_2,
  INITIAL_JSON_LIST_5,
  PROGRAM_JSON,
  INITIAL_TOOLBOX_XML,
  INITIAL_TOOLBOX_JSON,
  INITIAL_TOOLBOX_CATEGORIES,
};

export default ConfigFiles;
