

const HandleAction = (acts) => {
    const len = acts.length;
    if(len === 1)
      return OneAction(acts);
    if(len === 2)
      return TwoAction(acts);
    if(len === 3)
      return ThreeAction(acts);
    
    return FourAction(acts);
}

const FourAction = (acts) => {

    return {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0],
                        "text": acts[0]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm"
                },
                {
                  "type": "separator",
                  "color": "#31666b",
                  "margin": "md"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[1],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[1],
                        "text": acts[1]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                }
              ],
              "margin": "none",
              "spacing": "none",
              "borderWidth": "none",
              "cornerRadius": "none",
              "paddingAll": "xl",
              "paddingBottom": "xxl",
              "paddingTop": "lg",
              "backgroundColor": "#eeeeee"
            }
          },
          {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[2],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[2],
                        "text": acts[2],
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm"
                },
                {
                  "type": "separator",
                  "color": "#31666b",
                  "margin": "md"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[3],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[3],
                        "text": acts[3]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                }
              ],
              "margin": "none",
              "spacing": "none",
              "borderWidth": "none",
              "cornerRadius": "none",
              "paddingAll": "xl",
              "paddingBottom": "xxl",
              "paddingTop": "lg",
              "backgroundColor": "#eeeeee"
            }
          }
        ]
      }
    };
};

const ThreeAction = (acts) => {
  return {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents":{
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0],
                        "text": acts[0]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                },
                {
                  "type": "separator",
                  "color": "#31666b",
                  "margin": "xl"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[1],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[1],
                        "text": acts[1]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                },
                {
                  "type": "separator",
                  "color": "#31666b",
                  "margin": "xl"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[2],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[2],
                        "text": acts[2]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                }
              ],
              "margin": "none",
              "spacing": "none",
              "borderWidth": "none",
              "cornerRadius": "none",
              "paddingAll": "xl",
              "paddingBottom": "xxl",
              "paddingTop": "lg",
              "backgroundColor": "#eeeeee"
            }
          }
        ]
      }
  };
}

const TwoAction = (acts) => {
    return {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0],
                        "text": acts[0]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                },
                {
                  "type": "separator",
                  "color": "#31666b",
                  "margin": "xl"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[1],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[1],
                        "text": acts[1]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "md"
                }
              ],
              "margin": "none",
              "spacing": "none",
              "borderWidth": "none",
              "cornerRadius": "none",
              "paddingAll": "xl",
              "paddingBottom": "xxl",
              "paddingTop": "lg",
              "backgroundColor": "#eeeeee"
            }
          }
        ]
      }
    };
}

const OneAction = (acts) => {
    return {
      "type": "flex",
      "altText": "This is a Flex Message",
      "contents": {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": acts[0],
                      "size": "md",
                      "align": "center",
                      "wrap": true,
                      "action": {
                        "type": "message",
                        "label": acts[0],
                        "text": acts[0]
                      },
                      "margin": "none",
                      "color": "#428f96"
                    }
                  ],
                  "spacing": "none",
                  "margin": "none",
                  "cornerRadius": "md",
                  "borderWidth": "none",
                  "backgroundColor": "#ffffff",
                  "paddingAll": "sm",
                  "offsetTop": "sm"
                }
              ],
              "margin": "none",
              "spacing": "none",
              "borderWidth": "none",
              "cornerRadius": "none",
              "paddingAll": "xl",
              "paddingBottom": "xxl",
              "paddingTop": "lg",
              "backgroundColor": "#eeeeee"
            }
          }
        ]
      }
    };
}


export default HandleAction;