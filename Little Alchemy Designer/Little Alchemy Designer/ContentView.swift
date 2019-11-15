//
//  ContentView.swift
//  Little Alchemy Designer
//
//  Created by Surya Jasper on 11/7/19.
//  Copyright © 2019 Surya Jasper. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    @State var images: [Image]
    var buttonIndex: Int = 0
    
    func newItem() -> Button<AnyView> {
        return Button(action: {
            let panel = NSOpenPanel()
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                let result = panel.runModal()
                if result == .OK {
                    self.images[buttonIndex] = Image(;
                }
            }
        }) { AnyView(Text("Choose file")) }
    }
    
    var body: some View {
        VStack {
            Text("weoifj")
        }.frame(width: 640, height: 480)
    }

}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
