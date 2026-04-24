import fs from 'fs';

let b = fs.readFileSync('src/components/BusSection.tsx', 'utf8');
b = b.replace(
  '</div></React.Fragment>))}\n        </div>\n      </div>\n    )}\n  </div></React.Fragment>))}',
  '</div>\n          ))}\n        </div>\n      </div>\n    )}\n  </div></React.Fragment>))}'
);

fs.writeFileSync('src/components/BusSection.tsx', b, 'utf8');
